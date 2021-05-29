import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { InputText } from '@components/inputAndButton';
import Layout from '@components/Layout';
import { useImmer } from 'use-immer';
import DisplaySearchResult2 from './displaySearchResult';
import { SearchIcon } from '@heroicons/react/solid';

export default function SearchPage(): JSX.Element {
    const [state, setState] = useState('');
    const [usersSearchResults, setUsersSearchResults] = useImmer({
        isLoading: false,
        data: [],
        offset: 0,
        perPage: 8,
        currentPage: 0,
        pageCount: 0,
    });

    const currentPageData = usersSearchResults.data.slice(
        usersSearchResults.offset,
        usersSearchResults.offset + usersSearchResults.perPage
    );

    const handlePageClick = (e: { selected: number }) => {
        const selectedPage = e.selected;
        const offset = selectedPage * usersSearchResults.perPage;

        setUsersSearchResults(draft => {
            draft.currentPage = selectedPage;
            draft.offset = offset;
        });
    };

    useEffect(() => {
        (async function search() {
            if (state) {
                // START LOADING
                setUsersSearchResults(draft => {
                    draft.isLoading = true;
                });
                // FETCH DATA
                fetch(`https://api.github.com/search/users?q=${state}&per_page=100`)
                    .then(async res => {
                        const data = await res.json();

                        setUsersSearchResults(draft => {
                            draft.data = data.items;
                            draft.pageCount = Math.ceil(
                                data.items.length / usersSearchResults.perPage
                            );
                            // STOP LOADING
                            draft.isLoading = false;
                        });
                    })
                    .catch(error => console.log(error));
            }
        })();
    }, [state]);

    return (
        <Layout title="Home">
            <div className="max-w-4xl mx-auto mt-10">
                <div className="flex justify-center items-center">
                    <SearchIcon className={`w-7 h-7 mr-2 text-gray-700 -mb-1`} />
                    <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white">
                        Search GitHub Users
                    </h2>
                </div>
                <InputText
                    title="Start typing to search"
                    value={state}
                    onChangeHandler={e => setState(e.target.value)}
                    id="login_email"
                    type="search"
                    isLoading={usersSearchResults.isLoading}
                />
                <p className="pl-4 text-sm text-gray-700 dark:text-gray-300 mt-4">
                    <span className="text-red-600">*</span>
                    API limit: Limited to 100 results per search. 10 searches per minute.
                </p>

                <div className="px-4 py-6">
                    <div className="max-w-none mx-auto">
                        <div className="bg-white overflow-hidden sm:rounded-lg">
                            <ul className="divide-y divide-gray-200" aria-disabled="true">
                                {usersSearchResults.data.length > 0 && (
                                    <DisplaySearchResult2
                                        usersSearchResults={usersSearchResults}
                                        currentPageData={currentPageData}
                                    >
                                        <ReactPaginate
                                            previousLabel={'prev'}
                                            nextLabel={'next'}
                                            breakLabel={'...'}
                                            breakClassName={'break-me'}
                                            pageCount={usersSearchResults.pageCount}
                                            marginPagesDisplayed={1}
                                            pageRangeDisplayed={0}
                                            onPageChange={handlePageClick}
                                            containerClassName={'pagination'}
                                            subContainerClassName={'pages pagination'}
                                            activeClassName={'active'}
                                        />
                                    </DisplaySearchResult2>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
