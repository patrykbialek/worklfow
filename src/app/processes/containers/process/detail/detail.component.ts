import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as fromModels from '../../../../processes/models';
import { ProcessesStoreService } from 'src/app/processes/store/processes-store.service';

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
      description: ['', Validators.required],
      endDate: ['', Validators.required],
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      team: [''],
      owner: ['', Validators.required],
      tasks: this.formBuilder.array([]),
    });
  }

  onSelectProcessTemplate(template: any) {
    this.newProcess = template;
    this.processForm.get('name').setValue(template.name);

    const tasks = this.processForm.get('tasks') as FormArray;
    Object.values(this.taskTemplates).forEach((task: any) => {
      tasks.push(this.formBuilder.group({
        name: task.name,
        section: task.section,
      }))
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    const today = new Date().toISOString();
    const endDate = this.processForm.get('endDate').value;
    this.processForm.get('endDate').setValue(endDate.toISOString());
    this.processForm.get('startDate').setValue(today);

    this.newProcess = {
      ...this.newProcess,
      description: this.processForm.get('description').value,
      endDate: this.processForm.get('endDate').value,
      name: this.processForm.get('name').value,
      owner: this.processForm.get('owner').value,
      startDate: this.processForm.get('startDate').value,
      tasks: this.processForm.get('tasks').value,
    }

    delete this.newProcess.key;
    this.dialogRef.close(this.newProcess);
  }

  onGoBackToTemplates() {
    this.newProcess = null;
  }
}
