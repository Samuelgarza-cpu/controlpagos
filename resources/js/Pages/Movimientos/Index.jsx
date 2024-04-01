import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import DemoComponent from '@/Components/DataPicker';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Datepicker from "tailwind-datepicker-react"
import dayjs from 'dayjs';
const IndexMovimientos = ({ auth, selector, flash }) => {
    // const { flash } = usePage().props
    const [alertShow, setAlertShow] = useState(false);
    const [show, setShow] = useState(false)
    const [confirmingApplyPayments, SetConfirmingApplyPayments] = useState(false);
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
    useEffect(() => {
        if (flash.message == 'PAGO APLICADO' || flash.message == 'NADA QUE APLICAR') {
            setTimeout(() => {
                setAlertShow(false)
            }, 2000);
            setAlertShow(true);
        } else if (flash.message == 'YA HAY PAGOS') {
            SetConfirmingApplyPayments(true);

        }
    }, [flash.message])

    const valoresIniciales = {
        nombre: "",
        estructura_id: "",
        area_id: "",
        nivel_id: "",
        fecha: ""

    }
    const { data, errors, setData, post } = useForm(valoresIniciales);

    useEffect(() => { setData('fecha', dayjs(new Date()).format('YYYY/MM/DD')) }, [])
    const submit = (e) => {
        e.preventDefault();

        post(route('movimientos.store'));
    }
    const handlePago = () => {
        const dataAll = [];
        dataAll.push(selector.resultados)
        post(route('movimientos.pagos', dataAll));
    }
    const closeModal = () => {
        SetConfirmingApplyPayments(false);

    };
    const confirmPayments = () => {
        SetConfirmingApplyPayments(true);
    };
    const handleClose = (state) => {
        setShow(state)
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between'>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">MOVIMIENTOS</h2>
                    {/* <Link href={route('registros.index')}>
                        REGISTROS
                    </Link> */}
                </div>
            }
        >
            <Head title="Movimientos" />

            <div className="py-12">
                <div className=" mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className='flex justify-center'>
                        <Transition
                            show={alertShow}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-xl text-gray-600">{flash.message}</p>
                        </Transition>
                    </div>
                    < div className="sm:col-span-2 flex justify-center  h-16">
                        <PrimaryButton className={'bg-blue-500 hover:bg-blue-700 text-white font-bold rounded w-2/5 flex items-center justify-center text-4xl'} onClick={handlePago}>
                            PAGAR ${selector.totalpagar && selector.totalpagar}
                        </PrimaryButton>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className=" p-6 text-gray-900">
                            <form onSubmit={submit} className='space-y-3'>
                                <div className=' grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                                    <div className="sm:col-span-1">
                                        {/* NOMBRE */}

                                        <InputLabel htmlFor="nombre" value="Nombre" />
                                        <TextInput
                                            id="nombre"
                                            type="text"
                                            name="nombre"
                                            value={data.nombre}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('nombre', e.target.value)}
                                        />
                                        <InputError message={errors.nombre} className="mt-2" />
                                    </div>
                                    <div className="sm:col-span-1">
                                        {/* ESTRUCTURA */}

                                        <InputLabel htmlFor="estructura" value="Estructura" />
                                        <select className=' border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' id='estructura' name='estructura' onChange={(e) => {
                                            e.preventDefault();
                                            setData('estructura_id', e.target.value)
                                        }} >
                                            <option value="" selected>Selecciona una Opcion.....</option>
                                            {selector.estructuras.map((estructura) =>
                                                <option key={estructura.id} value={estructura.id}>{estructura.nombreEstructura}</option>
                                            )}

                                        </select>
                                        <InputError message={errors.estructura_id} className="mt-2" />
                                    </div>
                                    <div className="sm:col-span-1">
                                        {/* NIVELES */}

                                        <InputLabel htmlFor="nivel" value="Nivel" />
                                        <select className=' border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' id='nivel' name='nivel' onChange={(e) => {
                                            e.preventDefault();
                                            setData('nivel_id', e.target.value)
                                        }} >
                                            <option value="" selected>Selecciona una Opcion.....</option>
                                            {selector.niveles.map((nivel) =>
                                                <option key={nivel.id} value={nivel.id}>{nivel.nombreNivel}</option>
                                            )}

                                        </select>
                                        <InputError message={errors.nivel_id} className="mt-2" />
                                    </div>
                                    <div className="sm:col-span-1">
                                        {/* AREAS   */}

                                        <InputLabel htmlFor="area" value="Area" />
                                        <select className=' border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' id='area' name='area' onChange={(e) => {
                                            e.preventDefault();
                                            setData('area_id', e.target.value)
                                        }} >
                                            <option value="" selected>Selecciona una Opcion.....</option>
                                            {selector.areas.map((area) =>
                                                <option key={area.id} value={area.id}>{area.nameAreaI}</option>
                                            )}

                                        </select>
                                        <InputError message={errors.area_id} className="mt-2" />



                                    </div>
                                    {/* <div className="sm:col-span-1">
                                        <div>
                                            <InputLabel htmlFor="" value="Dia de Pago" />
                                            <Datepicker options={options} onChange={(selectData) => { setData('fecha', dayjs(selectData).format('YYYY/MM/DD')) }} show={show} setShow={handleClose} />
                                        </div>
                                    </div> */}
                                    < div className="sm:col-span-1 flex justify-center space-x-3 ">
                                        <PrimaryButton>
                                            BUSCAR
                                        </PrimaryButton>
                                    </div>
                                    {/* BOTONES */}

                                </div>
                            </form>

                        </div>
                    </div>
                    <div className="sm:col-span-1 flex flex-col justify-center items-center font-bold  h-1">
                        <h1>TOTAL DE REGISTROS</h1>
                        <h2>{selector.totalRegistros && selector.totalRegistros}</h2>
                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Nombre
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Estructura
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Nivel
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Area
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Importe a Pagar
                                    </th>
                                    {/* <th scope="col" className="px-6 py-3">
                                        Accion
                                    </th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    selector.resultados && selector.resultados.map(resultado => (
                                        <tr key={resultado.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {resultado.nombre}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {resultado.estructura.nombreEstructura}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {resultado.nivel.nombreNivel}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {resultado.area.nameAreaI}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                ${resultado.nivel.importe}
                                            </th>


                                        </tr>

                                    ))
                                }

                            </tbody>
                        </table>

                    </div>
                </div>
            </div >
            {/* <DangerButton onClick={confirmPayments}>VALIDAR MODAL</DangerButton> */}
            <Modal show={confirmingApplyPayments} onClose={closeModal}>
                <form className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        ¿Estás seguro de que quieres procesar los pagos?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        ESTOS USUARIOS YA TIENEN PAGOS APLICADOS EN ESTE DIA.
                    </p>

                    <div className="mt-6">

                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>

                        <DangerButton onClick={handlePago} className="ms-3" >
                            APLICAR PAGOS
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout >

    )
}

export default IndexMovimientos