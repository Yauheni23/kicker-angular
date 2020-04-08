import { ColorTop, DefaultColor } from '../../constants';
import { OnInit, ViewChild } from '@angular/core';
import { EditorService } from '../../services/editor';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


export class Rating<T> implements OnInit {
    readonly pageSizeOptions: number[] = [ 10, 5, 25, 100 ];

    dataSource: MatTableDataSource<T>;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private ratingService: EditorService<T>) {
    }

    ngOnInit(): void {
        this.ratingService.getAll()
            .subscribe(data => {
                this.dataSource = new MatTableDataSource(this.changeData(data));
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    setColor(place: number): string {
        return ColorTop[place] || DefaultColor;
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim()
            .toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    protected changeData(data: T[]): T[] {
        return data;
    }
}
