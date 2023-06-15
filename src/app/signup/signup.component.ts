import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignUpModel } from '../models/signup-model.model';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  model: SignUpModel;
  emailAvailability: boolean | undefined = undefined;
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService) {
    this.model = new SignUpModel();
    this.signupForm = this.formBuilder.group(SignUpModel.getValidationRules());
  }

  async checkEmailAvailability(email: string): Promise<void> {
    try {
      this.emailAvailability = await this.accountService.checkEmailAvailability(email).toPromise();
      this.errorMessage = this.emailAvailability === false ? 'Email is already registered' : null;
    } catch (error) {
      console.error('Error occurred while checking email availability', error);
      this.errorMessage = 'Error occurred while checking email availability';
    }
  }

  async onSubmit() {
    if (this.signupForm.valid) {
      const email = this.signupForm.value.email;
      await this.checkEmailAvailability(email);

      if (this.emailAvailability === true) {
        // Email is available, proceed with signup
        try {
          await this.accountService.signup(this.model).toPromise();
          console.log('User created successfully');
          // Reset the form and model after successful submission
          this.signupForm.reset();
          this.model = new SignUpModel();
        } catch (error) {
          console.error('An error occurred while signing up', error);
          // Handle the error as needed
        }
      } else {
        // Email is not available, display error message
        // Email is not available, display error message
        this.signupForm.controls['email'].setErrors({ 'emailTaken': true });
      }
    } else {
      // Form is invalid, display error messages
      this.signupForm.markAllAsTouched();
    }
  }
}
