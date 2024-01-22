'use client';

type Props = {
  id: string;
};

const Checkbox = ({ id }: Props) => (
  <div className="flex items-center">
    <input
      onChange={(e) => console.log('cool', e.target.checked)}
      id={id}
      type="checkbox"
      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
    />
    <label htmlFor={id} className="sr-only">
      checkbox
    </label>
  </div>
);

export default Checkbox;
