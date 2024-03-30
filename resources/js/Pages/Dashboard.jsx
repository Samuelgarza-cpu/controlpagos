import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, nivelesImporte }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="flex flex-col bg-white p-8 rounded shadow-md w-auto  ">
                    {/* 
                    {nivelesImporte && nivelesImporte.map((nivelImporte) => (


                        <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <img className="object-cover w-20 rounded-t-lg  md:rounded-none md:rounded-s-lg" src={`/storage/login.svg`} alt="" />
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{nivelImporte.nombreNivel}</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> ${nivelImporte.Total}</p>
                            </div>
                        </a>

                    )
                    )} */}




                </div>
            </div>
        </AuthenticatedLayout >
    );
}
