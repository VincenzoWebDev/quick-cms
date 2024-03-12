
const PageComponent = ({ currentPage }) => {


    return (
        <>
            <h1>{currentPage.title}</h1>
            {/* Utilizza dangerouslySetInnerHTML per includere il contenuto HTML */}
            <div dangerouslySetInnerHTML={{ __html: currentPage.content }} />
        </>
    );
};

export default PageComponent;