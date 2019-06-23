import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, RequiredValidator } from '@angular/forms';
import { OccupationService } from '../occupation.service';
import { UserForm } from '../user-form';

@Component({
  selector: 'app-user-input-form',
  templateUrl: './user-input-form.component.html',
  styleUrls: ['./user-input-form.component.css']
})
export class UserInputFormComponent implements OnInit {
  occupationList : string[]
  premiumAmount : number
  isPremiumAvailable : boolean
  userForm: FormGroup;
  minDate : Date
  maxDate : Date
  constructor(private occupationService: OccupationService) {}
  
  ngOnInit() {
    this.minDate = new Date(1900, 0, 1);
    this.maxDate = new Date();
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl(new Date()),
      occupation : new FormControl('', Validators.required),
      sumAssured: new FormControl('', [Validators.required])
    });
    
       this.occupationService.getOccupationList().subscribe(
         oc=>
         {
           this.occupationList = oc
         }
   
       )
     }

     public hasError = (controlName: string, errorName: string) =>{
      return this.userForm.controls[controlName].hasError(errorName);
    }
     public calculatePremium = (userFormValue) => {
      this.isPremiumAvailable = false
      if (this.userForm.valid) {
        this.GetPremiumAmount(userFormValue);
      }
    }
   
    private GetPremiumAmount = (userFormValue) => {
      let user: UserForm= {
        name: userFormValue.name,
        dateOfBirth: userFormValue.dateOfBirth,
        sumAssured: userFormValue.sumAssured,
        occupation : userFormValue.occupation
      }
      this.occupationService.GetCalculatedPremium(user).subscribe(premium => {
        this.premiumAmount = premium
        this.isPremiumAvailable = true
      })
    }


}
