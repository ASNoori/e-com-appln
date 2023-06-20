import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
   signupform!: FormGroup;
  constructor(private fb:FormBuilder, private http:HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupform =this.fb.group({
      'fullname': new FormControl(),
      'mobile': new FormControl(),
      'email': new FormControl(),
      'password': new FormControl()

    })
  }
  
  signup(){
     this.http.post<any>("http://localhost:3000/signupusers",this.signupform.value)
     .subscribe(res=>{
      alert("signup successful");
      this.signupform.reset();
      this.router.navigate(['login']);
     },err=>{
      alert("Something went wrong");
     })
  }
}
