import { DataTable } from 'react-native-paper';

const CustomTable = ({ headers, data, onRowPress, headerStyle, rowStyle, cellStyle }) => {
  return (
    <DataTable>
      <DataTable.Header style={[styles.header, headerStyle]}>
        {headers.map((header, index) => (
          <DataTable.Title key={index} style={[styles.cell, cellStyle]}>
            {header}
          </DataTable.Title>
        ))}
      </DataTable.Header>

      {data.map((row, rowIndex) => (
        <DataTable.Row
          key={rowIndex}
          style={[styles.row, rowStyle]}
          onPress={() => onRowPress && onRowPress(row)}
        >
          {row.map((cell, cellIndex) => (
            <DataTable.Cell key={cellIndex} style={[styles.cell, cellStyle]}>
              {cell}
            </DataTable.Cell>
          ))}
        </DataTable.Row>
      ))}
    </DataTable>
  );
};

export default CustomTable;