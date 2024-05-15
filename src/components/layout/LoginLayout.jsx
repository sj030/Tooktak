export default function LoginLayout({children}) {
    return (
        <section className="hero has-background-grey-light is-fullheight ">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-7-tablet is-5-desktop is-6-widescreen">
                            <form action="" className="box">
                                {children}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
