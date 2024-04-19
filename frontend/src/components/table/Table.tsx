interface HeaderType {
  width?: string;
  columnHeader: string;
  align?: "center" | "left" | "right" | "justify" | "char";
}

interface DataTableType<T> {
  headers: HeaderType[];
  data: T[];
  columnDatas: string[];
}

const Table = <T = any>({ headers, data, columnDatas }: DataTableType<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            {
              headers.map((ele, idx) => (
                <th
                  key={idx}
                  align={ele.align || 'center'}
                  style={{ width: ele.width ? ele.width : undefined }}
                >
                  {ele.columnHeader}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            data.map((ele: T, idx) => (
              <tr key={idx}>
                {columnDatas.map((columnData: string, idx2) => (
                  <td key={idx2}>{(ele as any)[columnData]}</td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table
