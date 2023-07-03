import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  completed: boolean = false;
  taskList: any[] = [];
  newTask:boolean;
  editVal: '';
  editIndex : number
  newTodoForm = this.formBuilder.group({
    todoItem: ''
  })
  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  };
  constructor(
    private formBuilder: FormBuilder,private snackBar: MatSnackBar
  ) { }
  error(message) {
    this.config.panelClass = ['notification', 'error'];
    this.snackBar.open(message, '', this.config);
  }
  success(message) {
    this.config.panelClass = ['notification', 'success'];
    this.snackBar.open(message, '', this.config);
  }
addTask() {
    debugger;
    const value = this.newTodoForm.value.todoItem
    if(this.newTask){
    let index = -1;
    for (let i = 0; i < this.taskList.length; i++) {
        if (this.taskList[i].name === value) {
        index = i;
        }
    }

    if (index > -1) {
       this.error('Duplicate Entries!')
    }else{
      this.taskList.push({ id: this.taskList.length, name: value })
      window.localStorage.setItem('task', JSON.stringify(this.taskList))
      this.newTodoForm.reset();
      this.newTask = false;
      this.newTask =true;
      this.success('Added Successfully!')
    }
  }else{
    this.taskList[this.editIndex].name = value;
    this.newTask=true;
    this.newTodoForm.reset();
    this.success('Updated Successfully!')
  }
  }

  removeTask(i: any) {
    this.taskList.splice(i, 1)
    window.localStorage.setItem('task', JSON.stringify(this.taskList))
    this.success('Deleted Successfully!')
    
  }

  markDone(value: any,index) {
    debugger;
    this.editVal = value.name;
    this.editIndex = index
    this.newTodoForm.patchValue({
      todoItem:  value.name
    });
    this.newTask = false;
    // this.newTodoForm.value.todoItem = value.name;
    // this.newTodoForm[index].first_name = value;
  }
  
  

  ngOnInit(): void {
    debugger;
    this.taskList = window.localStorage.getItem('task') ? JSON.parse(localStorage.getItem('task')) : []
    this.newTask = !this.newTodoForm.value.todoItem
  }

}
function todoItem(todoItem: any) {
  throw new Error('Function not implemented.');
}

