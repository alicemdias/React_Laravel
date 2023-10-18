import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/Table';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import { data } from 'autoprefixer';
import { Transition } from "@headlessui/react";
import axios from 'axios';


export default function UpdatePizzaOrderForm({ pizza, className = '' }) {
    
    const [formData, setFormData] = useState({
        size: pizza.size,
        crust: pizza.crust,
        toppings: pizza.toppings.join(','),
        status: pizza.status
    });
        
    const [recentlySuccessful, setRecentlySuccessful] = useState(false); // Define the recentlySuccessful state variable
    const [hasError, setHasError] = useState(false); // Define hasError state
    const [processing, setProcessing] = useState(false); // Define the processing state variable

    const submit = async (e) => {
        e.preventDefault();

        setProcessing(true); // Set processing to true when the form is processing

        try {
            // Simulate the update
            await axios.patch(route('pizzas.update', pizza.id), {
                preserveScroll: true,
            });

            setRecentlySuccessful(true);

            // Redirect to the /pizzas page
            Inertia.visit.put(route('pizzas.index'));
        }
        
        catch (error) {
            // Handle any errors here
            setHasError(true);
        }

        finally {
            setProcessing(false); // Set processing back to false after the processing is complete
        }

        setTimeout(() => {
            setRecentlySuccessful(true);
            setProcessing(false); // Set processing back to false after the processing is complete
        }, 1000);

        setTimeout(() => {
            setRecentlySuccessful(true); // Set recentlySuccessful to true after a successful update (simulated here)
        }, 1000);
        
    };

    const statusOptions = [
        'Ordered',
        'Prepping',
        'Baking',
        'Checking',
        'Ready',
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    console.log('recentlySuccessful:', recentlySuccessful); // Log the value of recentlySuccessful

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Order Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    View and change any information associated with this order.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">

                <div>
                    <InputLabel htmlFor="size" value="Size" />
                    
                    <TextInput
                        id="size"
                        className="mt-1 block w-full"
                        value={formData.size}
                        disabled
                    />
                </div>

                <div>
                    <InputLabel htmlFor="crust" value="Crust" />
                    
                    <TextInput
                        id="crust"
                        className="mt-1 block w-full"
                        value={formData.crust}
                        disabled
                    />
                </div>

                <div>
                    <InputLabel htmlFor="toppings" value="Toppings" />
                    
                    <TextInput
                        id="toppings"  // Use 'toppings' as the id, not 'name'
                        className="mt-1 block w-full"
                        value={formData.toppings}
                        disabled
                    />
                </div>

                <div>
                    <InputLabel htmlFor="status" value="Status" />
                    <select
                        id="status"
                        name="status"
                        className="mt-1 block w-full"
                        value={formData.status}
                        onChange={handleInputChange}
                    >
                        {statusOptions.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                    
                    <InputError className="mt-2" message={hasError ? 'An error occurred' : ''} />

                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save Changes</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        {recentlySuccessful && ( // Show the "Saved" message if recentlySuccessful is true
                        <p className="text-sm text-gray-600">Saved</p>
                    )}
                    </Transition>
                </div>
            </form>
        </section>
    );
}
