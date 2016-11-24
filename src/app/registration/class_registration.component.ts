import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CourseService, AlertService } from '../_services/index';
declare var $:JQueryStatic;

@Component({
	selector: '[registration]',
	moduleId: module.id,
	templateUrl: './class_registration.template.html',
	encapsulation: ViewEncapsulation.None
	//styleUrls: ['./class_registration.style.scss']
})

export class ClassRegistration implements OnInit {
	private loading: boolean;
	private model: any = {};
	private step = 0;
	private majors: any[] = [];
	private courses: any[] = [];
	private sections: any[] = [];

	private courseName: string;

	constructor(
		private alertService: AlertService,
		private courseService: CourseService
	) {
	}

	ngOnInit() {
		this.courseService.getAllMajors().subscribe(
			data => {
				// successfully search all majors
				for (var i = 0; i < data.value.length; i++) {
					this.majors.push(data.value[i]);
				}
			}
		)

	}

	private searchCourse() {
		if (this.step === 0) {
			this.courseService.getMajorCourses(this.model.majorInfo.SubjectId).subscribe (
				data => {
					this.step = 1;
					this.courses = [];// empty the array first
					for (var i = 0; i < data.value.length; i++) {
						this.courses.push(data.value[i]);
					}
				},
				error => {
					this.alertService.error(error.err);
				}
			)
		} else if (this.step >= 1) {
			this.courseName = this.model.majorInfo.Abbreviation + this.model.courseInfo.Number;
			this.courseService.getCourseDetails(this.courseName).subscribe (
				data => {
					this.step = 2;
					this.sections = data;
				},
				error => {
					this.alertService.error(error.err);
				}
			)
		}
	}

	// private rmpHandler(professor: string) {
	//     this.professorInfo = this.rmp.getProfessorInfo(professor);
	//     return this.professorInfo;
	// }

	private back() {
		this.step--;
	}

	/* Table Part */
	public columns:Array<any> = [
		{ title: 'Number', name: 'Number'},
		{ title: 'Title', name:'Title' }
	]
	public rows:Array<any> = [];
	public page:number = 1;
	public itemsPerPage:number = 20;
	public maxSize:number = 10;
	public numPages:number = 1;
	public length:number = 0;

	public config:any = {
		paging: true,
		sorting: {columns: this.columns},
		filtering: {filterString: ''},
		className: ['table-striped', 'table-bordered']
	}


	public changePage(page:any, data:Array<any> = this.courses):Array<any> {
		let start = (page.page - 1) * page.itemsPerPage;
		let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
		return data.slice(start, end);
	}

	public changeSort(data:any, config:any):any {
		if (!config.sorting) {
			return data;
		}

		let columns = this.config.sorting.columns || [];
		let columnName:string = void 0;
		let sort:string = void 0;

		for (let i = 0; i < columns.length; i++) {
			if (columns[i].sort !== '' && columns[i].sort !== false) {
				columnName = columns[i].name;
				sort = columns[i].sort;
			}
		}

		if (!columnName) {
			return data;
		}

		// simple sorting
		return data.sort((previous:any, current:any) => {
			if (previous[columnName] > current[columnName]) {
				return sort === 'desc' ? -1 : 1;
			} else if (previous[columnName] < current[columnName]) {
				return sort === 'asc' ? -1 : 1;
			}
			return 0;
		});
	}

	public changeFilter(data:any, config:any):any {
		let filteredData:Array<any> = data;
		this.columns.forEach((column:any) => {
			if (column.filtering) {
				filteredData = filteredData.filter((item:any) => {
					return item[column.name].match(column.filtering.filterString);
				});
			}
		});

		if (!config.filtering) {
			return filteredData;
		}

		if (config.filtering.columnName) {
			return filteredData.filter((item:any) =>
									   item[config.filtering.columnName].match(this.config.filtering.filterString));
		}

		let tempArray:Array<any> = [];
		filteredData.forEach((item:any) => {
			let flag = false;
			this.columns.forEach((column:any) => {
				if (item[column.name].toString().match(this.config.filtering.filterString)) {
					flag = true;
				}
			});
			if (flag) {
				tempArray.push(item);
			}
		});
		filteredData = tempArray;

		return filteredData;
	}

	public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
		if (config.filtering) {
			Object.assign(this.config.filtering, config.filtering);
		}

		if (config.sorting) {
			Object.assign(this.config.sorting, config.sorting);
		}

		let filteredData = this.changeFilter(this.courses, this.config);
		let sortedData = this.changeSort(filteredData, this.config);
		this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
		this.length = sortedData.length;
	}

	public onCellClick(data: any): any {
        this.model.courseInfo = data.row;
        this.searchCourse();
	}
}
