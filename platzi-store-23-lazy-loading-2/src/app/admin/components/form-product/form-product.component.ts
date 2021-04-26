import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  form: FormGroup
  image$: Observable<any>

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private angularFireStorage: AngularFireStorage
  ) {
    this.buildForm()
  }

  ngOnInit() {
  }

  saveProduct(event: Event) {
    event.preventDefault()
    if (this.form.valid) {
      const product = this.form.value
      this.productService.createProduct(product)
        .subscribe((product) => {
          console.log(product)
          this.router.navigate(['./admin/products'])
        })
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: [null, [Validators.required, MyValidators.isPriceValid]],
      image: [''],
      description: ['', [Validators.required]]
    })
  }

  uploadFile(event) {
    const file = event.target.files[0]
    const dir = 'images'
    const fileRef = this.angularFireStorage.ref(dir)
    const task = this.angularFireStorage.upload(dir,file)

    task.snapshotChanges()
      .pipe(
        finalize(() => {
          this.image$ = fileRef.getDownloadURL()
          this.image$.subscribe(url => {
            this.form.get('image').setValue(url)
          })
        })
      ).subscribe()
  }

  get priceField() {
    return this.form.get('price')
  }

  get titleField() {
    return this.form.get('title')
  }

  get idField() {
    return this.form.get('id')
  }

  get descriptionField() {
    return this.form.get('description')
  }

}
