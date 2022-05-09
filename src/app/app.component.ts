import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit(){
      this.signupForm = new FormGroup({
        'userData': new FormGroup({
          'username' : new FormControl(null,[Validators.required,this.forbiddenNames.bind(this)]),
          'email' : new FormControl(null, [Validators.required,Validators.email], this.forbiddenEmails),
        }),
/*         'username' : new FormControl(null,Validators.required),
        'email' : new FormControl(null, [Validators.required,Validators.email]), */
        'gender' : new FormControl('male'),
        'hobbies': new FormArray([])
      });
  }
  onSubmit(){
    console.log(this.signupForm);
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
   /*  here the code inside small brackets lets TS know that it is a form array */

  }

  getControls(){
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  /* while making a validator we need to always pass control like given below and also the jso like below */

  forbiddenNames(control: FormControl):{[s:string]:boolean}{
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){
      return{'nameIsForbidden': true};

    }
    return null;
   /*  if validation is successful always pass null or nothing like above we should not pass
    like above with true */
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve,reject)=>{
      setTimeout(() =>{
        if(control.value === 'test@test.com'){
          resolve({'emailIsForbidden': true});
        }else{
          resolve(null);
        }
      },1500);
    });
    return promise;
  }
}
