import { useEffect, useState } from 'react';
import { Table, Button, Select } from 'antd';

export function Companies() {
  const [companies, setCompanies] = useState([]);
  const [sectorID, setSectorID] = useState(null);
  const [industryID, setIndustryID] = useState(null);

  useEffect(() => {
    let route = `/api/companies/all`;
    if (sectorID && industryID) {
      route = `/api/companies/all/${sectorID}/${industryID}`;
    } else if (sectorID) {
      route = `/api/companies/all/${sectorID}`;
    }

    (async () => {
      const response = await fetch(route, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();

      console.log(data);
      setCompanies(data.companies.map((c, i) => { c['key'] = i; return c; }));
    })();
  }, [sectorID, industryID])

  const columns = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: ' ',
      key: 'action',
      render: (text, record) => (
        <Button href={`/companies/${record.companyID}`}>Details</Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Companies</h2>
      <SectorsIndustrySelector sectorID={sectorID} setSectorID={setSectorID}
        industryID={industryID} setIndustryID={setIndustryID} />
      <Table columns={columns} dataSource={companies} />
    </div>
  );
}

function SectorsIndustrySelector({ sectorID, setSectorID, industryID, setIndustryID }) {
  const [sectors, setSectors] = useState([]);
  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/sectors/`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();

      console.log(data);
      setSectors(data);
    })();
  }, [])

  const renderSectorOptions = () => {
    return sectors.map((sector, i) => (
      <Select.Option key={i} value={sector.sectorID}>{sector?.sectorName}</Select.Option>
    ));
  }

  const handleSectorSelect = (selectedSectorID) => {
    if (selectedSectorID !== -1) {
      setSectorID(selectedSectorID);

      (async () => {
        const response = await fetch(`/api/industries/${selectedSectorID}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();

        console.log("industries", data);
        setIndustries(data);
      })();
    } else {
      setSectorID(null);
      setIndustryID(null);
    }
  }

  const handleIndustrySelect = (selectedIndustryID) => {
    setIndustryID(selectedIndustryID !== -1 ? selectedIndustryID : null);
  }

  return (
    <div style={{ margin: '12px 0' }}>
      <span style={{ marginRight: 12 }}>Sector:</span>
      <Select defaultValue={-1} onSelect={handleSectorSelect} style={{ minWidth: 200, marginRight: 24 }}>
        <Select.Option value={-1}>All</Select.Option>
        {renderSectorOptions()}
      </Select>
      <span style={{ marginRight: 12 }}>Industry:</span>
      <Select value={industryID || -1} onSelect={handleIndustrySelect} disabled={!sectorID} style={{ minWidth: 200 }}>
        <Select.Option value={-1}>All</Select.Option>
        {industries.map((industry, i) => (
          <Select.Option key={i} value={industry.industryID}>{industry.name}</Select.Option>
        ))}
      </Select>
    </div>
  )
}
