import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-registrationform',
  templateUrl: './registrationform.component.html',
  styleUrls: ['./registrationform.component.scss']
})
export class RegistrationformComponent {
  @Output() interestsChanged = new EventEmitter<string[]>();
  registrationForm!: FormGroup;
  photoPreview: any;
  userData: any;
  newInterest: string = '';
  interests: string[] = [];
  

  countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Usa",
    "India",
    "Canada"

  ];

  states = [
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
  ];






  //countries: string[] = ['USA', 'Canada', 'UK', 'Australia', 'India'];

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserServiceService) {}

  ngOnInit(): void {
    // Initialize form
    this.registrationForm = this.formBuilder.group({
      photo: [''],
      
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]{1,20}$')]],
      lastName: [''],
      email: [''],
      mobile:[''],
     age:[''],
      country: [''],
      state:[''],
      addressType: [''],
      address1: [''],
      address2: [''],
      companyAddress1: [''],
      companyAddress2: [''],
      interest:['']
    });

    // Retrieve user data from router state
    this.userData = history.state.userData;
    if (this.userData) {
      // Populate form fields with user data
      this.registrationForm.patchValue({
        photo: this.userData.photo,
        age: this.userData.age,
        mobile:this.userData.mobile,
        firstName: this.userData.firstName,
        email: this.userData.email,
        lastName: this.userData.lastName,
        state:this.userData.state,
        interest:this.userData.interest,
        country: this.userData.country,
        addressType: this.userData.addressType,
        address1: this.userData.address1,
        address2: this.userData.address2,
        companyAddress1: this.userData.companyAddress1,
        companyAddress2: this.userData.companyAddress2
      });
    }
  }

  onInputChange(event: any) {
    event.target.value = event.target.value.replace(/\D/g, "");
  }

  addInterest() {
    if (this.newInterest.trim() !== '' && !this.interests.includes(this.newInterest.trim())) {
      this.interests.push(this.newInterest.trim());
      this.newInterest = '';
      this.emitInterests(); // Emit the updated interests array
    }
  }

  removeInterest(interest: string) {
    const index = this.interests.indexOf(interest);
    if (index !== -1) {
      this.interests.splice(index, 1);
      this.emitInterests(); // Emit the updated interests array
    }
  }

  addInterest2() {
    if (this.newInterest.trim() !== '' && !this.interests.includes(this.newInterest.trim())) {
      this.interests.push(this.newInterest.trim());
      this.newInterest = '';
    }
  }


  
  
  removeInterest2(interest: string) {
    const index = this.interests.indexOf(interest);
    if (index !== -1) {
      this.interests.splice(index, 1);
    }
  }
  


  addInterest3() {
    if (this.newInterest.trim() !== '' && !this.interests.includes(this.newInterest.trim())) {
      this.interests.push(this.newInterest.trim());
      this.newInterest = '';
      this.emitInterests();
    }
  }

  removeInterest3(interest: string) {
    const index = this.interests.indexOf(interest);
     if (index !== -1) {
       this.interests.splice(index, 1);
       this.emitInterests();
     }
  }
   
 
  private emitInterests() {
    this.interestsChanged.emit(this.interests);
  }

   async submitForm() {
    if (this.registrationForm.valid) { 
      console.log('responsive,,,,,,,,,,,')
      const formData = this.registrationForm.value;
      let res=await this.userService.createUser(this.registrationForm.value).toPromise()
        console.log(res);
        this.userService.id=res.id
      
      this.router.navigateByUrl('/profile');
    }}

  toggleAddressFields() {
    const addressType = this.registrationForm.get('addressType')?.value;
    if (addressType === 'Home') {
      this.registrationForm.get('companyAddress1')?.reset();
      this.registrationForm.get('companyAddress2')?.reset();
    } else if (addressType === 'Company') {
      this.registrationForm.get('address1')?.reset();
      this.registrationForm.get('address2')?.reset();
    }
  }

  cancel() {
    this.router.navigateByUrl('/home');
  }


  onPhotoChange(event: any): void {
    const file = event.target.files[0]; 
    const reader = new FileReader();
    
   
    if (file && file.type.startsWith('image')) {
      const maxSize = 310 * 325; 
      const fileSize = file.size; 
      
      
      if (fileSize <= maxSize) {
        reader.onload = () => {
          
          this.photoPreview = reader.result as string;
        };
        
     
        reader.readAsDataURL(file);
      } else {
      
        alert('Please select an image with size not exceeding 310x325 pixels.');
      }
    } else {
     
      alert('Please select a valid image file.');
    }
  }
  
}





