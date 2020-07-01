import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as fromModels from '../../../../processes/models';
import { ProcessesStoreService } from 'src/app/processes/store/processes-store.service';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';
import { workingHours } from '@shared/services/app-config';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  newProcess: fromModels.Process;
  processForm: FormGroup;
  processTemplates;
  taskTemplates;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DetailComponent>,
    private formBuilder: FormBuilder,

    private processesStore: ProcessesStoreService,
  ) { }

  ngOnInit() {
    this.processesStore.getProcessTemplates()
      .subscribe(response => this.processTemplates = response);
    this.processesStore.getTaskTemplates()
      .subscribe(response => this.taskTemplates = response);

    this.processForm = this.formBuilder.group({
      created: ['', Validators.required],
      description: [''],
      endDate: ['', Validators.required],
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      team: [''],
      owner: ['', Validators.required],
      tasks: this.formBuilder.array([]),
    });
  }

  get created() {
    return this.processForm.get('created') as FormControl;
  }
  get endDate() {
    return this.processForm.get('endDate') as FormControl;
  }
  get startDate() {
    return this.processForm.get('startDate') as FormControl;
  }

  onSelectProcessTemplate(template: any) {
    this.newProcess = template;
    this.processForm.get('name').setValue(template.name);
    const templateFromTasks = Object.keys(template.tasks);

    const tasks = this.processForm.get('tasks') as FormArray;
    const templateTasks = this.taskTemplates.filter((task: fromModels.Task) => {
      return templateFromTasks.includes(task.key);
    });
    templateTasks.forEach((task: any) => {
      tasks.push(this.formBuilder.group({
        board: task.board,
        name: task.name,
        section: task.section,
      }))
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const today = new Date();
    this.created.setValue(`${moment(today).format('YYYY-MM-DDTHH:MM:SS')}`);
    this.endDate.setValue(`${moment(this.endDate.value).format('YYYY-MM-DD')}T${workingHours.end}`);
    this.startDate.setValue(`${moment(today).format('YYYY-MM-DD')}T${workingHours.start}`);

    this.newProcess = {
      ...this.newProcess,
      created: this.processForm.get('created').value,
      description: this.processForm.get('description').value,
      endDate: this.processForm.get('endDate').value,
      name: this.processForm.get('name').value,
      owner: this.processForm.get('owner').value,
      startDate: this.processForm.get('startDate').value,
      tasks: this.processForm.get('tasks').value,
    }

    delete this.newProcess.key;

    if (this.processForm.valid) {
      this.dialogRef.close(this.newProcess);
    }
  }

  onGoBackToTemplates() {
    this.newProcess = null;
  }
}
