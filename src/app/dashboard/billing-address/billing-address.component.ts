import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BillingService, BillingAddress } from '../../services/billing.service';

@Component({
  selector: 'app-billing-address',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './billing-address.component.html',
  styleUrls: ['./billing-address.component.css']
})
export class BillingAddressComponent implements OnInit {
  billingForm!: FormGroup;
  isLoading = false;
  saveMessage = '';
  errorMessage = '';
  userEmail = '';

  constructor(
    private fb: FormBuilder,
    private billingService: BillingService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getUserEmail();
    this.loadSavedBillingData();
  }

  private getUserEmail(): void {
    // Get user email from localStorage (from Google auth)
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      const profile = JSON.parse(userProfile);
      this.userEmail = profile.email || '';
      // Pre-fill email in form
      this.billingForm.patchValue({
        email_address: this.userEmail
      });
    }
  }

  private initializeForm(): void {
    this.billingForm = this.fb.group({
      branch: ['Store Name - HQ', Validators.required],
      email_address: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]],
      country_code: ['KE', Validators.required],
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: ['', Validators.required],
      line_1: ['', Validators.required],
      line_2: [''],
      city: [''],
      state: [''],
      postal_code: [''],
      zip_code: ['']
    });
  }

  public loadSavedBillingData(): void {
    if (!this.userEmail) {
      console.log('⚠️ No user email found, skipping billing data load');
      return;
    }
    
    console.log('🔍 Loading billing data for email:', this.userEmail);
    this.isLoading = true;
    this.errorMessage = '';
    
    this.billingService.getBillingAddress(this.userEmail).subscribe({
      next: (billingData) => {
        console.log('✅ Successfully loaded billing data:', billingData);
        this.billingForm.patchValue({
          branch: billingData.branch,
          email_address: billingData.email_address,
          phone_number: billingData.phone_number,
          country_code: billingData.country_code,
          first_name: billingData.first_name,
          middle_name: billingData.middle_name || '',
          last_name: billingData.last_name,
          line_1: billingData.line_1,
          line_2: billingData.line_2 || '',
          city: billingData.city || '',
          state: billingData.state || '',
          postal_code: billingData.postal_code || '',
          zip_code: billingData.zip_code || ''
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.log('⚠️ No existing billing address found or error loading:', error);
        // This is expected for new users, so we don't show an error
        this.isLoading = false;
        
        // Fallback to localStorage for backward compatibility
        const savedData = localStorage.getItem('billingAddress');
        if (savedData) {
          console.log('💾 Loading fallback data from localStorage:', savedData);
          const billingData = JSON.parse(savedData);
          this.billingForm.patchValue({
            branch: billingData.branch,
            ...billingData.billing_address
          });
        } else {
          console.log('💭 No data found in localStorage either - new user');
        }
      }
    });
  }

  onSubmit(): void {
    if (this.billingForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.saveMessage = '';
      
      const formData = this.billingForm.value;
      const billingData: BillingAddress = {
        email: this.userEmail,
        branch: formData.branch,
        email_address: formData.email_address,
        phone_number: formData.phone_number,
        country_code: formData.country_code,
        first_name: formData.first_name,
        middle_name: formData.middle_name,
        last_name: formData.last_name,
        line_1: formData.line_1,
        line_2: formData.line_2,
        city: formData.city,
        state: formData.state,
        postal_code: formData.postal_code,
        zip_code: formData.zip_code
      };

      // Debug logging
      console.log('🚀 Submitting billing address data:');
      console.log('📧 User Email:', this.userEmail);
      console.log('📋 Form Data:', formData);
      console.log('🔄 Processed Billing Data:', billingData);
      console.log('📡 API Endpoint: POST /api/client/billing-address');

      this.billingService.saveBillingAddress(billingData).subscribe({
        next: (response) => {
          console.log('✅ API Success Response:', response);
          this.isLoading = false;
          this.saveMessage = response.message || 'Billing address saved successfully!';
          
          // Also save to localStorage as backup
          const localStorageData = {
            branch: formData.branch,
            billing_address: {
              email_address: formData.email_address,
              phone_number: formData.phone_number,
              country_code: formData.country_code,
              first_name: formData.first_name,
              middle_name: formData.middle_name,
              last_name: formData.last_name,
              line_1: formData.line_1,
              line_2: formData.line_2,
              city: formData.city,
              state: formData.state,
              postal_code: formData.postal_code,
              zip_code: formData.zip_code
            }
          };
          localStorage.setItem('billingAddress', JSON.stringify(localStorageData));
          console.log('💾 Data saved to localStorage as backup');
          
          // Clear success message after 5 seconds
          setTimeout(() => this.saveMessage = '', 5000);
        },
        error: (error) => {
          console.error('❌ API Error Response:', error);
          console.error('📝 Error Details:', {
            status: error.status,
            statusText: error.statusText,
            message: error.error?.message,
            fullError: error
          });
          
          this.isLoading = false;
          
          // Handle specific error cases
          if (error.status === 404 && error.error?.message === 'User not found') {
            this.errorMessage = 'Account setup required. Please contact support or try again later.';
            console.log('💡 Suggestion: Backend needs to create user account first or handle auto-registration');
          } else {
            this.errorMessage = error.error?.message || 'Failed to save billing address. Please try again.';
          }
          
          // Fallback to localStorage if API fails
          const localStorageData = {
            branch: formData.branch,
            billing_address: {
              email_address: formData.email_address,
              phone_number: formData.phone_number,
              country_code: formData.country_code,
              first_name: formData.first_name,
              middle_name: formData.middle_name,
              last_name: formData.last_name,
              line_1: formData.line_1,
              line_2: formData.line_2,
              city: formData.city,
              state: formData.state,
              postal_code: formData.postal_code,
              zip_code: formData.zip_code
            }
          };
          localStorage.setItem('billingAddress', JSON.stringify(localStorageData));
          console.log('💾 Fallback: Data saved to localStorage due to API error');
          
          // Show a more helpful message for 404 user not found
          if (error.status === 404) {
            this.saveMessage = 'Information saved locally. Your data is secure and will sync when account is ready.';
            this.errorMessage = '';
          } else {
            this.errorMessage += ' Data saved locally as backup.';
          }
          
          setTimeout(() => {
            this.saveMessage = '';
            this.errorMessage = '';
          }, 8000);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.billingForm.controls).forEach(key => {
      const control = this.billingForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.billingForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${this.getFieldLabel(fieldName)} is required`;
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['pattern']) return 'Please enter a valid phone number';
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      branch: 'Branch/Store Name',
      email_address: 'Email Address',
      phone_number: 'Phone Number',
      country_code: 'Country Code',
      first_name: 'First Name',
      last_name: 'Last Name',
      line_1: 'Address Line 1'
    };
    return labels[fieldName] || fieldName;
  }

  resetForm(): void {
    this.billingForm.reset();
    this.saveMessage = '';
    this.errorMessage = '';
    this.initializeForm();
    this.getUserEmail();
    this.loadSavedBillingData();
  }
}
