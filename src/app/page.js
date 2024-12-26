'use client'
import { useState } from "react";
import {addAbusence} from "./addAbsence"
import dayjs from 'dayjs';

const addabsence = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    absence_begin: "อื่นๆ",
    casue: "",
    absece_begin_date: "",
    absece_end_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const dateCondition = (d1,d2,dc,type) =>{
    var start = dayjs(d1);
    var end = dayjs(d2);
    var current = dayjs(dc);

    const diffDaysRequest = start.diff(current, 'day');
    if (diffDaysRequest < 3 && type=="พักร้อน") return "ต้องลาล่วงหน้า 3 วัน";

    if (start.isBefore(current, 'day')) return "ไม่อนุญาติให้บันทึกวันลาย้อนหลัง"

    const diffDaysVacation = end.diff(start, 'day');
    if (diffDaysVacation < 2 && type=="พักร้อน") return "ต้องพักร้อนไม่น้อยกว่า 2 วัน"
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString();
    const requestData = {
      ...formData,
      timestamp: currentDate,
      status: "รอพิจารณา",
    };

    var checkDate = dateCondition(formData.absece_begin_date,formData.absece_end_date,currentDate,formData.absence_begin)
    if (checkDate){
      alert(checkDate);
      return
    }

    addAbusence(requestData)
    console.log("Submitted data:", requestData);
    alert("ส่งคำขอเรียบร้อยแล้ว");
    // Here you can send 'requestData' to an API or backend server
  };

  return (
<div style={{ padding: "20px" }}>
  <h1>บันทึกรายการขอลาหยุด</h1>
  <form onSubmit={handleSubmit}>
    <div>
      <label>
        ชื่อ - นามสกุล: 
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
    </div>
    <div>
      <label>
        เบอร์โทรศัพท์: 
        <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
      </label>
    </div>
    <div>
      <label>
        ประเภทการลา: 
        <select name="absence_begin" value={formData.absence_begin} onChange={handleChange} required>
          <option value="ลาป่วย">ลาป่วย</option>
          <option value="ลากิจ">ลากิจ</option>
          <option value="พักร้อน">พักร้อน</option>
          <option value="อื่นๆ">อื่นๆ</option>
        </select>
      </label>
    </div>
    <div>
      <label>
        สาเหตุการลา: 
        <textarea name="casue" value={formData.casue} onChange={handleChange} required></textarea>
      </label>
    </div>
    <div>
      <label>
        วันที่ขอลา: 
        <input type="date" name="absece_begin_date" value={formData.absece_begin_date} onChange={handleChange} required />
      </label>
    </div>
    <div>
      <label>
        ถึงวันที่: 
        <input type="date" name="absece_end_date" value={formData.absece_end_date} onChange={handleChange} required />
      </label>
    </div>
    <button type="submit">บันทึก</button>
  </form>
</div>

  );
};

export default addabsence;