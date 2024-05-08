import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  providers: [BsModalService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'AngularCRUDv17';
  _service = inject(ApiService)

  formData: any = {
    name: '',
    email: '',
    password: '',
    avatar: ''
  };

  heading = ''
  btnStatus = ''
  editUser = {}
  productList: any = []

  ngOnInit(): void {
    this.getAllProducts()
    this.getAllUsers()
  }

  getAllProducts() {
    this._service.getAllProducts().subscribe({
      next: (response) => {
        console.log(response)
        this.productList = response
      },
      error: (err) => console.error(err)
    })
  }

  deleteProduct(id: any) {
    debugger
    this.productList = this.productList.filter((product: any) => product.id !== id);
    this._service.deleteProduct(id).subscribe({
      next: (response) => {
        console.log(response)
        if (response) {
          this.productList
        }
      },
      error: (err) => console.error(err)
    })
  }

  usersList: any = []
  getAllUsers() {
    return this._service.getAllUsers().subscribe({
      next: (response) => {
        console.log(response)
        this.usersList = response
      },
      error: (err) => console.error(err)
    })
  }

  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService) { }

  userIdtoEdit: any
  openModal(template: TemplateRef<void>, rowId = 0, value: any, heading: any) {
    this.userIdtoEdit = rowId
    this.modalRef = this.modalService.show(template);
    if (value == 'Add') {
      this.formData = {}
      this.btnStatus = value
      this.heading = heading
    }
    else {
      this.btnStatus = value
      this.heading = heading
      this._service.getSingleUser(rowId).subscribe({
        next: (response: any) => {
          console.log(response)
          this.formData = {
            name: response.name,
            email: response.email,
            password: response.password,
            avatar: response.avatar
          };
        },
        error: (err) => console.error(err)
      })
    }
  }

  submitForm() {
    if (this.btnStatus == 'add') {
      this._service.createUser(this.formData).subscribe({
        next: (response) => {
          console.log(response)
          this.getAllUsers()
        },
        error: (err) => console.error(err)
      })
    }
    else {
      this.updateSingleUser()
    }
  }

  updateSingleUser() {
    this._service.updateSingleUser(this.userIdtoEdit, this.formData).subscribe({
      next: (response) => {
        console.log(response)
        this.modalRef?.hide()
        this.getAllUsers()
      },
      error: (err) => console.error(err)
    })
  }
}
