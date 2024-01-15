'use client';

type Props = {
  id: string;
};

const Checkbox = ({ id }: Props) => (
  <div className="flex items-center">
    <input onChange={(e) => console.log('cool', e.target.checked)} id={id} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label htmlFor={id} className="sr-only">checkbox</label>
  </div>
);

export default Checkbox;
