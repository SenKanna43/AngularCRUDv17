import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http = inject(HttpClient)

  constructor() { }

  apiUrl = "https://api.escuelajs.co/api/v1/"

  getAllProducts() {
    return this.http.get(`${this.apiUrl}products`)
  }

  deleteProduct(id: any) {
    return this.http.delete(`${this.apiUrl}products/${id}`)
  }

  createUser(obj: any) {
    return this.http.post(`${this.apiUrl}users/`, obj)
  }

  getAllUsers() {
    return this.http.get(`${this.apiUrl}users`)
  }

  getSingleUser(id: any) {
    return this.http.get(`${this.apiUrl}users/${id}`)
  }

  updateSingleUser(id: any, obj: any) {
    return this.http.put(`${this.apiUrl}users/${id}`, obj)
  }
}
