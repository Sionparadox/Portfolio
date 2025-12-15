import { prisma } from '@/lib/prisma';

const Page = async () => {
  try {
    const contacts = await prisma.contact.findMany();
    return (
      <div className='flex flex-col gap-4 pt-40'>
        <p>성공! 데이터 수: {contacts.length}</p>
        {contacts.map((contact) => (
          <div key={contact.id}>
            <h1>{contact.name}</h1>
            <p>{contact.email}</p>
            <p>{contact.message}</p>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error('Prisma Error:', error);
    return (
      <div>
        <p>에러 발생!</p>
        <pre>{String(error)}</pre>
      </div>
    );
  }
};

export default Page;
