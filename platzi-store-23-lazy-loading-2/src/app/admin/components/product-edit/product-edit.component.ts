import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  form: FormGroup
  id: string

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.buildForm()
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id
      this.productService.getProduct(this.id)
        .subscribe((product) => {
          this.form.patchValue(product)
        })
    })
  }

  editProduct(event: Event) {
    event.preventDefault()
    if (this.form.valid) {
      const product = this.form.value
      this.productService.updateProduct(this.id, product)
        .subscribe((product) => {
          console.log(product)
          this.router.navigate(['./admin/products'])
        })
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: [null, [Validators.required, MyValidators.isPriceValid]],
      image: [''],
      description: ['', [Validators.required]]
    })
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
