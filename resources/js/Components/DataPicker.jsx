import { useState } from "react"
import Datepicker from "tailwind-datepicker-react"
const options = {
    title: "DIA DE PAGO",
    autoHide: true,
    todayBtn: true,
    clearBtn: false,
    clearBtnText: "Borrar",
    todayBtnText: "Hoy",
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
        background: "bg-gray-700 dark:bg-gray-800",
        todayBtn: "",
        clearBtn: "",
        icons: "",
        text: "",
        disabledText: "bg-red-500",
        input: "",
        inputIcon: "",
        selected: "",
    },
    icons: {
        // () => ReactElement | JSX.Element
        prev: () => <span>Previous</span>,
        next: () => <span>Next</span>,
    },
    datepickerClassNames: "top-12",
    defaultDate: new Date(),
    language: "es",
    disabledDates: [],
    weekDays: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Select Date",
    inputDateFormatProp: {
        day: "numeric",
        month: "2-digit",
        year: "numeric"
    }
}

export default function DemoComponent(setData) {
    const [show, setShow] = useState(false)
    const handleChange = (selectedDate) => {
        setData('fecha', selectedDate);
    }
    const handleClose = (state) => {
        setShow(state)
    }

    return (
        <div>
            <Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
        </div>
    )
}