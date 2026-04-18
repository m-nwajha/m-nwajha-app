import connectDB from '@/config/mongodb';
import Contact from '@/server/models/Contact';
import ContactsManager from '@/components/organisms/ContactsManager';
import DashboardHero from '@/components/molecules/DashboardHero';

export const metadata = {
    title: 'رسائل التواصل | لوحة التحكم',
};

async function getContactsData() {
    try {
        await connectDB();
        const items = await Contact.find({}).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(items));
    } catch (error) {
        console.error('Error fetching dashboard contacts data:', error);
        return [];
    }
}

export default async function ContactsDashboardPage() {
    const contacts = await getContactsData();

    return (
        <div className="space-y-8 p-8">
            <DashboardHero
                title="لوحة التحكم"
                subtitle="رسائل التواصل"
                description="استعرض رسائل الزوار، طلبات العمل، والاستفسارات التقنية الواردة عبر نموذج التواصل."
            />

            <ContactsManager initialContacts={contacts} />
        </div>
    );
}
