import React, { ChangeEvent } from 'react';

interface IInputText {
    title: string;
    showAsterick?: boolean;
    value: string;
    onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
    id: string;
    type: string;
    isLoading: boolean;
    placeholderText?: string;
}

export function InputText({
    title,
    showAsterick,
    value,
    onChangeHandler,
    id,
    type,
    isLoading,
    placeholderText,
}: IInputText): JSX.Element {
    return (
        <div className="relative flex flex-col px-4 pt-4">
            <label htmlFor={id} className="text-lg">
                {title} {showAsterick && <span className="text-red-600">*</span>}
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    {isLoading ? 'Search..' : 'Search'}
                </span>
                <input
                    defaultValue={value}
                    onChange={onChangeHandler}
                    type={type}
                    id={id}
                    placeholder={placeholderText}
                    className="dark:text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                />
            </div>
        </div>
    );
}
