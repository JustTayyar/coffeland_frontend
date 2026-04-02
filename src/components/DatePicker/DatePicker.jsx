import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './DatePicker.css';

const DatePicker = ({ value, onChange }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentDate = new Date();
  let pYear = value ? value.split('-')[0] : String(currentDate.getFullYear());
  let pMonth = value ? value.split('-')[1] : String(currentDate.getMonth() + 1).padStart(2, '0');
  let pDay = value ? value.split('-')[2] : String(currentDate.getDate()).padStart(2, '0');

  if(!pYear) pYear = String(currentDate.getFullYear());
  if(!pMonth) pMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
  if(!pDay) pDay = String(currentDate.getDate()).padStart(2, '0');

  const daysInMonth = new Date(parseInt(pYear), parseInt(pMonth), 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => String(i + 1).padStart(2, '0'));
  
  const months = [
    { val: '01', label: 'Yanvar' }, { val: '02', label: 'Fevral' }, { val: '03', label: 'Mart' },
    { val: '04', label: 'Aprel' }, { val: '05', label: 'May' }, { val: '06', label: 'İyun' },
    { val: '07', label: 'İyul' }, { val: '08', label: 'Avqust' }, { val: '09', label: 'Sentyabr' },
    { val: '10', label: 'Oktyabr' }, { val: '11', label: 'Noyabr' }, { val: '12', label: 'Dekabr' }
  ];
  const years = Array.from({ length: 20 }, (_, i) => String(2020 + i));

  const handleUpdate = (type, val) => {
     let y = pYear, m = pMonth, d = pDay;
     if (type === 'y') y = val;
     if (type === 'm') m = val;
     if (type === 'd') d = val;
     
     const newDaysInMonth = new Date(parseInt(y), parseInt(m), 0).getDate();
     if (parseInt(d) > newDaysInMonth) d = String(newDaysInMonth).padStart(2, '0');
     
     onChange(`${y}-${m}-${d}`);
     setOpenDropdown(null);
  };

  const selectedMonthLabel = months.find(m => m.val === pMonth)?.label || 'Ay';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.5fr) minmax(0, 1fr)', gap: '15px', position: 'relative' }} ref={dropdownRef}>
      
      {/* Day */}
      <div className="premium-datepicker-container">
        <div className={`premium-datepicker-input ${openDropdown === 'd' ? 'open' : ''}`} onClick={() => setOpenDropdown(openDropdown === 'd' ? null : 'd')} style={{ padding: '16px 12px', justifyContent: 'space-between' }}>
          <span>{pDay}</span>
        </div>
        {openDropdown === 'd' && (
          <div className="premium-datepicker-popover custom-scrollbar-popover" style={{ minWidth: '100%', padding: '5px', maxHeight: '200px', overflowY: 'auto' }}>
            {days.map(d => (
              <div key={d} className={`premium-datepicker-day ${pDay === d ? 'selected' : ''}`} style={{ textAlign: 'center', padding: '10px 0' }} onClick={(e) => { e.stopPropagation(); handleUpdate('d', d); }}>{d}</div>
            ))}
          </div>
        )}
      </div>

      {/* Month */}
      <div className="premium-datepicker-container">
        <div className={`premium-datepicker-input ${openDropdown === 'm' ? 'open' : ''}`} onClick={() => setOpenDropdown(openDropdown === 'm' ? null : 'm')} style={{ padding: '16px 12px', justifyContent: 'space-between' }}>
          <span>{selectedMonthLabel}</span>
        </div>
        {openDropdown === 'm' && (
          <div className="premium-datepicker-popover custom-scrollbar-popover" style={{ minWidth: '100%', padding: '5px', maxHeight: '200px', overflowY: 'auto' }}>
            {months.map(m => (
              <div key={m.val} className={`premium-datepicker-day ${pMonth === m.val ? 'selected' : ''}`} style={{ textAlign: 'center', padding: '10px 0' }} onClick={(e) => { e.stopPropagation(); handleUpdate('m', m.val); }}>{m.label}</div>
            ))}
          </div>
        )}
      </div>

      {/* Year */}
      <div className="premium-datepicker-container">
        <div className={`premium-datepicker-input datepicker-input2 ${openDropdown === 'y' ? 'open' : ''}`} onClick={() => setOpenDropdown(openDropdown === 'y' ? null : 'y')}>
          <span>{pYear}</span>
        </div>
        {openDropdown === 'y' && (
          <div className="premium-datepicker-popover custom-scrollbar-popover" style={{ minWidth: '100%', padding: '5px', maxHeight: '200px', overflowY: 'auto' }}>
            {years.map(y => (
              <div key={y} className={`premium-datepicker-day ${pYear === y ? 'selected' : ''}`} style={{ textAlign: 'center', padding: '10px 0' }} onClick={(e) => { e.stopPropagation(); handleUpdate('y', y); }}>{y}</div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default DatePicker;