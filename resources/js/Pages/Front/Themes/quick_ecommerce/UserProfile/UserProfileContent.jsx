import { ProfileAccordion } from "@/components/Themes/QuickEcommerce/Index"
import EcommerceLayout from "@/Layouts/EcommerceLayout"

const UserProfileContent = ({ children }) => {
    return (
        <>
            <EcommerceLayout>
                <div className="container mb-5">
                    <div className="d-flex justify-content-center row">
                        <div className="col-md-3">
                            <ProfileAccordion />
                        </div>
                        <div className="col-md-9">
                            {children}
                        </div>
                    </div>
                </div>
            </EcommerceLayout>
        </>
    )
}

export default UserProfileContent