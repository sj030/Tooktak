import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DateBox({ label, start, end, setStart, setEnd, setDateRange }) {
    const handleStartChange = (date) => {
        setStart(date);
        const adjustedEndDate = end ? new Date(end.getTime()) : new Date(date.getTime());
        setDateRange(date, adjustedEndDate);
    };

    const handleEndChange = (date) => {
        const adjustedEndDate = new Date(date.getTime());
        setEnd(adjustedEndDate);
        if (start) {
            setDateRange(start, adjustedEndDate);
        }
    };

    return (
        <div className={"box is-primary "}>
            <div className="date-box">
                <div className="level">
                    <div className="level-left">
                        <label className="label">{label}</label>
                    </div>
                    <div className="date-picker field has-addons is-primary is-outlined is-fullwidth">
                        <DatePicker
                            className="input"
                            selected={start}
                            onChange={handleStartChange}
                            selectsStart
                            startDate={start}
                            endDate={end}
                            placeholderText="시작 날짜"
                        />
                        <span> ~ </span>
                        <DatePicker
                            className="input"
                            selected={end}
                            onChange={handleEndChange}
                            selectsEnd
                            startDate={start}
                            endDate={end}
                            minDate={start}
                            placeholderText="종료 날짜"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
