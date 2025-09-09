'use client';

import { useState, useTransition } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import clsx from 'clsx';
import type { PricingResponse } from '@/lib/pricing-calculator';
import { PricingResults } from './PricingResults';

interface PricingFormProps {
  action: (formData: FormData) => Promise<PricingResponse>;
  token: string;
  theme: 'dark' | 'light';
}

const serviceTypes = [
  { id: 'hourly', name: 'Hourly Service (Round Trip)' },
  { id: 'point-to-point', name: 'Point to Point' },
  { id: 'airport', name: 'Airport Transfer' },
];

const vehicles = [
  { id: 'sedan', name: 'Sedan (04/05)', capacity: '3 passengers' },
  { id: 'transit', name: 'Transit', capacity: '12-15 passengers' },
  { id: 'executive-mini-bus', name: 'Executive Mini Bus (09)', capacity: '12 passengers' },
  { id: 'mini-bus-sofa', name: 'Mini Bus Sofa (01)', capacity: '10 passengers' },
  { id: 'stretch-limo', name: 'Stretch Limo (03)', capacity: '8 passengers' },
  { id: 'sprinter-limo', name: 'Sprinter Limo (02)', capacity: '10 passengers' },
  { id: 'limo-bus', name: 'Limo Bus (10)', capacity: '18 passengers' },
];

const hourOptions = [
  { value: '3', label: '3 Hours (Minimum)' },
  { value: '4', label: '4 Hours' },
  { value: '5', label: '5 Hours' },
  { value: '6', label: '6 Hours' },
  { value: '7', label: '7 Hours' },
  { value: '8', label: '8 Hours' },
  { value: '9', label: '9 Hours' },
  { value: '10', label: '10+ Hours' },
];

const dayTypes = [
  { value: 'weekday', label: 'Monday-Thursday (10% Discount)' },
  { value: 'weekend', label: 'Friday-Sunday' },
  { value: 'holiday', label: 'Holiday (+25%)' },
];

const airports = [
  { value: 'richmond', label: 'Richmond International (RIC)' },
  { value: 'charlottesville', label: 'Charlottesville/Williamsburg' },
  { value: 'national', label: 'Reagan National (DCA)' },
  { value: 'dulles', label: 'Washington Dulles (IAD)' },
  { value: 'bwi', label: 'Baltimore Washington (BWI)' },
];

const tripTypes = [
  { value: 'one-way', label: 'One Way' },
  { value: 'round-trip', label: 'Round Trip' },
];

function CustomSelect({ 
  options, 
  value, 
  onChange, 
  placeholder,
  theme 
}: {
  options: { value: string; label: string }[] | { id: string; name: string; capacity?: string }[];
  value: any;
  onChange: (value: any) => void;
  placeholder: string;
  theme: 'dark' | 'light';
}) {
  const buttonClasses = clsx(
    'relative w-full cursor-default rounded-lg py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm',
    theme === 'dark' 
      ? 'bg-white/10 border border-white/30 text-white' 
      : 'bg-white border border-gray-300 text-gray-900'
  );

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className={buttonClasses}>
          <span className="block truncate">
            {'name' in (options[0] || {}) 
              ? (options as any[]).find(o => o.id === value)?.name || placeholder
              : (options as any[]).find(o => o.value === value)?.label || placeholder
            }
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className={clsx(
            'absolute mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50',
            theme === 'dark' 
              ? 'bg-gray-800 border border-white/30' 
              : 'bg-white border border-gray-300'
          )}>
            {options.map((option) => (
              <Listbox.Option
                key={'id' in option ? option.id : option.value}
                className={({ active }) => clsx(
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                  active 
                    ? theme === 'dark' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-900'
                    : theme === 'dark' ? 'text-white' : 'text-gray-900'
                )}
                value={'id' in option ? option.id : option.value}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {'name' in option ? option.name : option.label}
                      {'capacity' in option && option.capacity && (
                        <span className="text-sm opacity-75 ml-2">- {option.capacity}</span>
                      )}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export function PricingForm({ action, token, theme }: PricingFormProps) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<PricingResponse | null>(null);
  const [serviceType, setServiceType] = useState('hourly');
  const [vehicleType, setVehicleType] = useState('sedan');
  const [hours, setHours] = useState('3');
  const [dayType, setDayType] = useState('weekday');
  const [airportCode, setAirportCode] = useState('richmond');
  const [tripType, setTripType] = useState('one-way');

  const inputClasses = clsx(
    'w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all',
    theme === 'dark' 
      ? 'bg-white/10 border-white/30 text-white placeholder-gray-400' 
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
  );

  const labelClasses = clsx(
    'block text-sm font-semibold mb-2 uppercase tracking-wider',
    theme === 'dark' ? 'text-red-400' : 'text-red-600'
  );

  const handleSubmit = async (formData: FormData) => {
    // Add token to form data (server-side validation)
    formData.append('token', token);
    
    startTransition(async () => {
      const response = await action(formData);
      setResult(response);
    });
  };

  // Get current date and time + 2 hours for defaults
  const today = new Date().toISOString().split('T')[0];
  const futureTime = new Date();
  futureTime.setHours(futureTime.getHours() + 2);
  const defaultTime = futureTime.toTimeString().slice(0, 5);

  return (
    <>
      <form action={handleSubmit} className="space-y-6">
        {/* Service Type and Vehicle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>Service Type</label>
            <input type="hidden" name="serviceType" value={serviceType} />
            <CustomSelect
              options={serviceTypes}
              value={serviceType}
              onChange={setServiceType}
              placeholder="Select service type"
              theme={theme}
            />
          </div>
          <div>
            <label className={labelClasses}>Vehicle Type</label>
            <input type="hidden" name="vehicleType" value={vehicleType} />
            <CustomSelect
              options={vehicles}
              value={vehicleType}
              onChange={setVehicleType}
              placeholder="Select vehicle"
              theme={theme}
            />
          </div>
        </div>

        {/* Hourly Options */}
        {serviceType === 'hourly' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Number of Hours</label>
              <input type="hidden" name="hours" value={hours} />
              <CustomSelect
                options={hourOptions}
                value={hours}
                onChange={setHours}
                placeholder="Select hours"
                theme={theme}
              />
            </div>
            <div>
              <label className={labelClasses}>Day Type</label>
              <input type="hidden" name="dayType" value={dayType} />
              <CustomSelect
                options={dayTypes}
                value={dayType}
                onChange={setDayType}
                placeholder="Select day type"
                theme={theme}
              />
            </div>
          </div>
        )}

        {/* Airport Options */}
        {serviceType === 'airport' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Airport Destination</label>
              <input type="hidden" name="airportCode" value={airportCode} />
              <CustomSelect
                options={airports}
                value={airportCode}
                onChange={setAirportCode}
                placeholder="Select airport"
                theme={theme}
              />
            </div>
            <div>
              <label className={labelClasses}>Trip Type</label>
              <input type="hidden" name="tripType" value={tripType} />
              <CustomSelect
                options={tripTypes}
                value={tripType}
                onChange={setTripType}
                placeholder="Select trip type"
                theme={theme}
              />
            </div>
          </div>
        )}

        {/* Service Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="serviceDate" className={labelClasses}>Service Date</label>
            <input
              type="date"
              id="serviceDate"
              name="serviceDate"
              defaultValue={today}
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="serviceTime" className={labelClasses}>Service Time</label>
            <input
              type="time"
              id="serviceTime"
              name="serviceTime"
              defaultValue={defaultTime}
              className={inputClasses}
            />
          </div>
        </div>

        {/* Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="pickupLocation" className={labelClasses}>Pickup Location</label>
            <input
              type="text"
              id="pickupLocation"
              name="pickupLocation"
              placeholder="e.g., 123 Main Street, Richmond, VA"
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="dropoffLocation" className={labelClasses}>Destination</label>
            <input
              type="text"
              id="dropoffLocation"
              name="dropoffLocation"
              placeholder="e.g., Downtown Hotel, Richmond, VA"
              className={inputClasses}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className={clsx(
            'w-full py-4 px-8 rounded-lg font-bold text-lg uppercase tracking-wider transition-all duration-300 shadow-lg',
            'bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white',
            'hover:from-red-700 hover:via-red-800 hover:to-red-900 hover:shadow-xl hover:-translate-y-1',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
            isPending && 'animate-pulse'
          )}
        >
          {isPending ? 'Calculating...' : 'Get Instant Quote'}
        </button>
      </form>

      {/* Results */}
      {result && <PricingResults result={result} theme={theme} />}
    </>
  );
}