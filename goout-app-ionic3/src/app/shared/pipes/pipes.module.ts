import { NgModule } from '@angular/core';
import { SortPipe } from './sort/sort';
import {FilterFieldPipe} from "./filter-field/filter-field.pipe";

@NgModule({
	declarations: [
	  SortPipe,
    FilterFieldPipe],
	imports: [],
	exports: [
	  SortPipe,
    FilterFieldPipe
  ]
})
export class PipesModule {}
