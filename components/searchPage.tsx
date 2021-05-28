import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { InputText } from '@components/inputAndButton';
import Layout from '@components/Layout';
import { useImmer } from 'use-immer';
import DisplaySearchResult from './displaySearchResult';

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
            <div className="max-w-4xl mx-auto">
                <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                    Search GitHub Users
                </h2>
                <InputText
                    title="Type a GitHub username"
                    showAsterick={true}
                    value={state}
                    onChangeHandler={e => setState(e.target.value)}
                    id="login_email"
                    type="search"
                    isLoading={usersSearchResults.isLoading}
                />

                {usersSearchResults.data.length > 0 && (
                    <DisplaySearchResult
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
                    </DisplaySearchResult>
                )}

                {/* NO RESULTS TO DISPLAY */}
                {!usersSearchResults.data.length && (
                    <p className="lg:rounded-lg text-center mt-5">Nothing to see here</p>
                )}
            </div>
        </Layout>
    );
}
