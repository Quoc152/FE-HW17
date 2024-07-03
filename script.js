let students = [];
let currentStudentId = null;
let nextStudentId = 3;

renderStudents = () => {
    students = [
        { id: 1, ten: "Nguyễn Văn A",lop: "21TDT3", mssv: 102234567, email: "a@gmail.com", khoa: "CNTT", gioitinh: "Nam", ngaysinh: "2003-02-03" },
        { id: 2, ten: "Nguyễn Văn B",lop: "21TDT3", mssv: 102232512, email: "b@gmail.com", khoa: "Fast", gioitinh: "Nam", ngaysinh: "2003-06-14" }
    ];
    showStudents(students);
    students = [];
}

document.getElementById('studentForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const id = nextStudentId++;
    const ten = document.getElementById('ten').value;
    const mssv = document.getElementById('mssv').value;
    const email = document.getElementById('email').value;
    const khoa = document.getElementById('khoa').value;
    const lop = document.getElementById('lop').value;
    const gioitinh = document.getElementById('gioitinh').value;
    const ngaysinh = document.getElementById('ngaysinh').value;

    students.push({id, ten, mssv, email, khoa, lop, gioitinh, ngaysinh });

    // updateStudents();
    showStudents(students);
    alert("Đã thêm sinh viên thành công!");
    // Xóa giá trị các ô input sau khi thêm
    document.getElementById('studentForm').reset();
});

submitUpdate = () => {
    const updatedName = document.getElementById('ten-upd').value;
    const updatedMssv = document.getElementById('mssv-upd').value;
    const updatedEmail = document.getElementById('email-upd').value;
    const updatedDepartment = document.getElementById('khoa-upd').value;
    const updatedClass = document.getElementById('lop-upd').value;
    const updatedGender = document.getElementById('gioitinh-upd').value;
    const updatedBirthDate = document.getElementById('ngaysinh-upd').value;

    const student = students.find(student => student.id == currentStudentId);
    student.ten = updatedName;
    student.mssv = updatedMssv;
    student.email = updatedEmail;
    student.khoa = updatedDepartment;
    student.lop = updatedClass;
    student.gioitinh = updatedGender;
    student.ngaysinh = updatedBirthDate;

    showStudents(students);
    document.getElementById('Inf-UpdateForm').reset();
    document.getElementById('studentFormArea').style.display = 'block';
    document.getElementById('UpdateForm').style.display = 'none';  
    currentStudentId = null;
}

deleteStudent = (index) => {
    // Hiển thị hộp thoại xác nhận
    const confirmation = window.confirm("Bạn có chắc chắn muốn xóa sinh viên này?");

    // Nếu người dùng nhấn OK
    if (confirmation) {
        students.splice(index, 1); // Xóa sinh viên khỏi mảng
        // updateStudents(); // Cập nhật lại bảng
        alert("Đã xóa thành công!");
        showStudents(students);
    }
}

const searchStudents = (query) => {
    const normalizedQuery = query.toLowerCase();
    return students.filter(student => student.ten.toLowerCase().includes(normalizedQuery));
};

document.getElementById('search-btn').addEventListener('click', () => {
    const searchQuery = document.getElementById('search-text').value;
    document.getElementById('search-text').value = "";
    const result = searchStudents(searchQuery);

    showStudents(result);
});

showStudents = (classList) => {
    const studentTableBody = document.getElementById('studentTableBody');
    studentTableBody.innerHTML = "";

    classList.forEach((student, index) => {
        const row = document.createElement('tr');
        row.classList.add('border-t-2');

        row.innerHTML = `
            <td class="py-3">
                <p class="text-gray-700 text-sm font-bold font-['Helvetica'] leading-tight">${student.ten}</p>
            </td>
            <td>
                <p class="text-gray-700 text-sm font-bold font-['Helvetica'] leading-tight">${student.mssv}</p>
            </td>
            <td>
                <p class="text-gray-700 text-sm font-bold font-['Helvetica'] leading-tight">${student.email}</p>
            </td>
            <td>
                <p class="text-gray-700 text-sm font-bold font-['Helvetica'] leading-tight">${student.khoa}</p>
            </td>
            <td>
                <p class="text-gray-700 text-sm font-bold font-['Helvetica'] leading-tight">${student.lop}</p>
            </td>
            <td>
                <p class="text-gray-700 text-sm font-bold font-['Helvetica'] leading-tight">${student.gioitinh}</p>
            </td>
            <td>
                <p class="text-gray-700 text-sm font-bold font-['Helvetica'] leading-tight">${student.ngaysinh}</p>
            </td>
            <td>
                <div class="flex justify-center items-center gap-2">
                    <button
                        class="update-btn px-5 py-1 rounded-xl bg-teal-300 text-white  hover:bg-teal-400 active:bg-teal-500"
                        type="button" data-id="${student.id}">Update</button>
                </div>
            </td>
            <td>
                <div class="flex justify-center items-center gap-2">
                    <a class="text-red-400 text-xs font-bold font-['Helvetica'] leading-[18px]" href="javascript:deleteStudent(${index})">Delete</a>
                </div>
            </td>
        `;

        studentTableBody.appendChild(row);
    });

    document.querySelectorAll('.update-btn').forEach(button => {
        button.addEventListener('click', function (event) {
            const studentId = event.target.dataset.id;
            currentStudentId = studentId;
            const student = students.find(student => student.id == studentId);
            document.getElementById('ten-upd').value = student.ten;
            document.getElementById('mssv-upd').value = student.mssv;
            document.getElementById('email-upd').value = student.email;
            document.getElementById('khoa-upd').value = student.khoa;
            document.getElementById('lop-upd').value = student.lop;
            document.getElementById('gioitinh-upd').value = student.gioitinh;
            document.getElementById('ngaysinh-upd').value = student.ngaysinh;
            document.getElementById('UpdateForm').style.display = 'block';
            document.getElementById('studentFormArea').style.display = 'none';
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const khoaSelects = document.querySelectorAll('.khoa-sel');
    const lopSelects = document.querySelectorAll('.lop-sel');

    const lopOptions = {
        CNTT: ['CNTT1', 'CNTT2', 'CNTT3'],
        Fast: ['Fast1', 'Fast2', 'Fast3'],
        "Cơ khí": ['CK1', 'CK2', 'CK3'],
        "Cơ khí giao thông": ['CKGT1', 'CKGT2', 'CKGT3'],
        Hóa: ['Hoa1', 'Hoa2', 'Hoa3'],
        "Môi trường": ['MT1', 'MT2', 'MT3'],
        "Kiến trúc": ['KT1', 'KT2', 'KT3'],
        "Xây dựng": ['XD1', 'XD2', 'XD3']
    };

    updateLopSelects = (selectedKhoa, lopSelects) => {
        lopSelects.forEach(lopSelect => {
            while (lopSelect.firstChild) {
                lopSelect.removeChild(lopSelect.firstChild);
            }

            if (selectedKhoa) {
                lopOptions[selectedKhoa].forEach((lop) => {
                    const option = document.createElement('option');
                    option.value = lop;
                    option.textContent = lop;
                    lopSelect.appendChild(option);
                });
            } else {
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Chọn lớp';
                lopSelect.appendChild(defaultOption);
            }
        });
    }

    khoaSelects.forEach(khoaSelect => {
        khoaSelect.addEventListener('change', () => {
            const selectedKhoa = khoaSelect.value;
            updateLopSelects(selectedKhoa, lopSelects);
        });

        if(khoaSelect.value == "All") {
            return false;
        } else if(khoaSelect.value) {
                updateLopSelects(khoaSelect.value, lopSelects);
            }
    });
});

// Hàm dùng cho bộ lọc
document.addEventListener('DOMContentLoaded', () => {
    const khoaSelectFilter = document.getElementById('khoa-fil');
    const lopSelectFilter = document.getElementById('lop-fil');

    const lopOptionsFilter = {
        CNTT: ['CNTT1', 'CNTT2', 'CNTT3'],
        Fast: ['Fast1', 'Fast2', 'Fast3'],
        "Cơ khí": ['CK1', 'CK2', 'CK3'],
        "Cơ khí giao thông": ['CKGT1', 'CKGT2', 'CKGT3'],
        Hóa: ['Hoa1', 'Hoa2', 'Hoa3'],
        "Môi trường": ['MT1', 'MT2', 'MT3'],
        "Kiến trúc": ['KT1', 'KT2', 'KT3'],
        "Xây dựng": ['XD1', 'XD2', 'XD3']
    };

    const updateLopSelectFilter = (selectedKhoaFilter, lopSelectFilter) => {
        while (lopSelectFilter.firstChild) {
            lopSelectFilter.removeChild(lopSelectFilter.firstChild);
        }

        const defaultOption = document.createElement('option');
        defaultOption.value = 'All';
        defaultOption.textContent = 'All';
        lopSelectFilter.appendChild(defaultOption);

        if (selectedKhoaFilter && selectedKhoaFilter !== 'All') {
            lopOptionsFilter[selectedKhoaFilter].forEach((lopFilter) => {
                const option = document.createElement('option');
                option.value = lopFilter;
                option.textContent = lopFilter;
                lopSelectFilter.appendChild(option);
            });
        }
    }

    khoaSelectFilter.addEventListener('change', () => {
        const selectedKhoaFilter = khoaSelectFilter.value;
        updateLopSelectFilter(selectedKhoaFilter, lopSelectFilter);
    });

    // Cập nhật lớp khi tải trang nếu có khoa được chọn sẵn
    if (khoaSelectFilter.value) {
        updateLopSelectFilter(khoaSelectFilter.value, lopSelectFilter);
    } else {
        // Nếu không có khoa được chọn sẵn, đặt mặc định là 'All'
        updateLopSelectFilter('All', lopSelectFilter);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const yearSelect = document.getElementById('namsinh-fil');

    const selectedYear = () => {
        for (let year = 1900; year <= 2024; year ++) {
            let option = document.createElement("option");
            option.value = year;
            option.text = year;
            yearSelect.appendChild(option);
        }
    }

    selectedYear();
})

document.getElementById('filter-btn').addEventListener('click', () => {
    const khoaValue = document.getElementById('khoa-fil').value;
    const lopValue = document.getElementById('lop-fil').value;
    const namsinhValue = document.getElementById('namsinh-fil').value;

    const filteredStudents = students.filter(student => {
        const khoaMatch = (khoaValue === 'All' || student.khoa === khoaValue);
        const lopMatch = (lopValue === 'All' || student.lop === lopValue);

        const studentYear = student.ngaysinh.split('-')[0];
        const namsinhMatch = (namsinhValue === 'All' || studentYear === namsinhValue);

        return khoaMatch && lopMatch && namsinhMatch;
    });

    showStudents(filteredStudents);
});


// Gọi hàm render lần đầu để hiển thị dữ liệu mẫu 
renderStudents();