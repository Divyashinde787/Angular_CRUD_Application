import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  userForm: any;
  users: any;

  constructor(public fb:FormBuilder,private service:CommonService, private router:Router){
    this.userForm = this.fb.group({
      id:[""],
      Name:[""],
      Email:[""],
      Mobile:[""],
      Age:[" "]
    })
  }
  ngOnInit(): void {
     this.GetAllUsers(); 
  }

  SubmitForm(){
    var type =this.userForm.value.id==null?'Add':'Update';
  this.service.AddUpdateUser(this.userForm.value,type).subscribe(data=>{
    if(type=='Add'){
      alert("Added");
    }else{
      alert("Updated");
    }
      this.router.navigate(["/userlist"]);
      this.userForm.reset();
      this.GetAllUsers();
      console.log(data);
    })
  }
  GetAllUsers(){
    this.service.GetAllUsers().subscribe(data=>{ 
        console.log('users', data);
        this.users = data;
      })
    }
  

}
