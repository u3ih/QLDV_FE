# Overview

Bài toán quản lý sinh viên
- hiển thị thông tin sinh viên và khóa học đang theo
- hiển thị thông tin khóa học và các sinh viên đang theo học

# Quản lý dữ liệu

- call API đến BE để lấy dữ liệu về `file các API em để trong src/fetch_api`
    + Student: Thêm, sửa, xóa, lấy thông tin sinh viên cùng với khóa học (relation)
    + Course: Thêm, xóa, lấy thông tin khóa học cùng với sinh viên (relation)
    + Class: em viết API để thêm sửa xóa nhưng không để thao tác trên Frontend

- sử dụng Redux để lưu trữ dữ liệu `sử dụng Redux-thunk tạo middleware để lấy dữ liệu với API`
    + file `store` ở trong `src/app`
    + các file trong `src/features` lưu trữ các action và reducer (em dùng để cập nhật lại toàn bộ dữ liệu của Student và Course)

# Component

- `Sidebar`: để quản lý và điều hướng các bảng Student, Course, DashBoard và trang để thêm sinh viên vào lớp học
- `Student`: em chia làm 3 Component
    + `StudentTable`: hiển thị danh sách sinh viên (tên, tuổi, địa chỉ,.., thao tác sửa, xóa)
        + ![Optional Text](../master/myFolder/StudentTable.png)
        + Dữ liệu hiển thị là Student relation với Course được em call API lại mỗi khi student hoặc course có thay đổi
            + ![Optional Text](../master/myFolder/functionStudentWithCourse.png)

    + `AddStudent`: Form để thêm mới student
        + Kiểm tra dữ liệu với 2 trường age và mã sinh viên
            + ![Optional Text](../master/myFolder/errorAge.png)

    + `StudentForm`: hiển thị `StudentTable` và `AddStudent`

- `Course`: em cũng chia làm 3 phần
    + `CourseTable`: hiển thị danh sách khóa học và thao tác xóa
        + Dữ liệu hiển thi là Course relation với Student được em call API lại mỗi khi student hoặc course có thay đổi
            + ![Optional Text](../master/myFolder/functionCourseWithStudent.png)
    + `AddCourse`: Form để thêm mới course
    + `CourseForm`: hiển thị `CourseTable` và `AddCourse`
- `DashBoard`: trang tổng quan để hiện thị các bảng (`StudentTable`, `CourseTable`)
- `ClassForm`: Form để gắn student và class vào course
    + ![Optional Text](../master/myFolder/addStudentToCourse.png)
