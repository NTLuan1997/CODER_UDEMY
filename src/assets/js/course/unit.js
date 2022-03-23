import { httpsService } from "../commons/httpService.js";
import { deleteDocument } from "../commons/delete.js";
import { renderHeaderTable, renderBodyTable, renderPagination } from "../commons/render.js";

window.onload = function (e) {
    let $ = document.querySelector.bind(document);
    let $$ = document.querySelectorAll.bind(document);

    let pageRequire = 5;
    let routerNew = $$(".header-router-link-detail")[0];
    let wrapperPagination = $$(".pagination")[0];
    let wrapperTableHeader = $("#unit-table-header");
    let wrapperTablebody = $("#unit-table-body");
    let titles = ["STT", "Mã khóa học", "Tên chương học", "Số lượng bài học", "Ngày tạo", "Lần cập nhật cuối", "Quyền"];

    console.log(location);

    let courseId = location.search.split("=")[1];
    let condition = [`courseId=${courseId}`];

    (function () {
        routerNew.setAttribute("href", location.href.replace("?", "/detail?type=create&"));

        httpsService(`API/unit/unit-home?limit=${pageRequire}&start=0&courseId=${courseId}`, "GET", null)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                renderHeaderTable(wrapperTableHeader, titles);
                renderPagination(wrapperPagination, 5, data.length, "API/unit/unit-home", (e) => {
                    renderBodyTable(wrapperTablebody, e?.units, ["_id", "__v"], "units", "lesson");
                    deleteDocument($$(".btn-delete-document"), "API/unit/unit-remove");
                }, condition);
                return data;
            })
            .then((data) => {
                renderBodyTable(wrapperTablebody, data?.units, ["_id", "__v"], "units", "lesson");
                deleteDocument($$(".btn-delete-document"), "API/unit/unit-remove");
            })
            .catch((err) => {
                console.log(err);
            })
    })()
}