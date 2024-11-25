import { useEffect } from "react";

const PageComponent = ({ currentPage, pageLayout }) => {

    useEffect(() => {
        const images = document.querySelectorAll('img');
        images.forEach(image => {
            if (!image.classList.contains('img-fluid')) {
                image.classList.add('img-fluid');
            }
        })
    }, [])

    if (currentPage.content == null) {
        return <></>
    }
    const dividedContent = currentPage.content.split('<hr>');


    return (
        <>
            <div className="container">
                {pageLayout.name == 'una colonna' &&
                    <>
                        <h1 className="mb-5">{currentPage.title}</h1>
                        <div className="col-lg-12">
                            {/* Utilizza dangerouslySetInnerHTML per includere il contenuto HTML */}
                            <div dangerouslySetInnerHTML={{ __html: currentPage.content }} />
                        </div>
                    </>
                }
                {pageLayout.name == 'due colonne' &&
                    <>
                        <div className="row">
                            <h1 className="mb-5">{currentPage.title}</h1>
                            <div className="col-lg-6">
                                <div dangerouslySetInnerHTML={{ __html: dividedContent[0] }} />
                            </div>
                            <div className="col-lg-6">
                                <div dangerouslySetInnerHTML={{ __html: dividedContent[1] }} />
                            </div>
                        </div>
                    </>
                }
                {pageLayout.name == 'tre colonne' &&
                    <>
                        <div className="row">
                            <h1 className="mb-5">{currentPage.title}</h1>
                            <div className="col-lg-4">
                                <div dangerouslySetInnerHTML={{ __html: dividedContent[0] }} />
                            </div>
                            <div className="col-lg-4">
                                <div dangerouslySetInnerHTML={{ __html: dividedContent[1] }} />
                            </div>
                            <div className="col-lg-4">
                                <div dangerouslySetInnerHTML={{ __html: dividedContent[2] }} />
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    );
};

export default PageComponent;