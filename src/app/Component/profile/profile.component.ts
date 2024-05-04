import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user: any = {};

  photoPreview: string | ArrayBuffer | null = null;
  userId: string = '';
  registrationForm!: FormGroup;

  constructor(
    private userService: UserServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getuserdetails();
  }
  async getuserdetails() {
    this.user = await this.userService
      .getUserData(this.userService.id)
      .toPromise();
    const fileName = this.user.photo.split('\\').pop();
    this.user.photo = 'assets/Images/' + fileName;
    console.log(this.user);
  }

  submitForm() {
    if (this.registrationForm.valid && this.userId !== null) {
      const userData = {};
      this.userService
        .updateUser(this.userId, userData)
        .subscribe((updatedUser) => {
          this.user = updatedUser;
        });
    }
  }

  editPhoto() {
    this.router.navigate(['/registration-form'], {
      state: { userData: this.user, editPhoto: true },
    });
  }

  editProfile() {
    this.router.navigate(['/registration-form'], {
      state: { userData: this.user },
    });
  }

  chooseFile() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }
}
