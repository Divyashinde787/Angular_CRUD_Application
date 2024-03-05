import { Component } from '@angular/core';
import { CommonService } from '../common.service';
import { UsersComponent } from '../users/users.component';
import { FormBuilder } from '@angular/forms';

declare var $:any

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent {

 users: any;
  userForm: any;
 constructor(public fb:FormBuilder,private service:CommonService){
  this.userForm = this.fb.group({
   id:[""],
    Name:[""],
    Email:[""],
    Mobile:[""],
    Age:[""]
  })
}
ngOnInit(): void {
  this.GetAllUsers(); 
}

DeleteUserById(ID:any){
  this.service.DeleteUserById(ID).subscribe(data=>{ 
      alert("user deleted!");
      this.GetAllUsers();
    })
  }
GetAllUsers(){
  this.service.GetAllUsers().subscribe(data=>{ 
      console.log('Users', data);
      this.users = data;
    })
  }

  GetUserById(ID:any){
    this.service.GetUserById(ID).subscribe(data=>{
     alert("get users sucessfully");
     $("#nav-home-tab").addClass('show');
     $("#nav-home-tab").addClass('active');

     $("#profile-tab").removeClass('show');
     $("#profile").removeClass('active');

      console.log("Users detail", data);
      this.userForm.patchValue({
        id:data.id,
         Name:data.Name,
         Email:data.Email,
        Mobile:data.Mobile,
        Age:data.Age
      })
    })

  }
}
