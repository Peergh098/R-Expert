import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Card, Slider, Select, Typography, Statistic, Table, Button,
  Row, Col, Divider, Tag, Space,
} from 'antd';
import {
  CalculatorOutlined, ThunderboltOutlined, ArrowRightOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { ServiceId } from '../types';

const { Title, Text } = Typography;
const { Option } = Select;

interface PricingRule {
  base: number;
  perPage: number;
  removalMultiplier?: number;
}

const PRICING: Record<ServiceId, PricingRule> = {
  'plagiarism-check': { base: 299, perPage: 5 },
  'plagiarism-removal': { base: 499, perPage: 15, removalMultiplier: 0.05 },
  proofreading: { base: 299, perPage: 10 },
  'citation-formatting': { base: 199, perPage: 5 },
  'thesis-writing': { base: 4999, perPage: 120 },
  'document-formatting': { base: 199, perPage: 5 },
};

const SERVICE_OPTIONS: { value: ServiceId; label: string; icon: string }[] = [
  { value: 'plagiarism-check', label: 'Plagiarism Check', icon: '🔍' },
  { value: 'plagiarism-removal', label: 'Plagiarism Removal', icon: '✏️' },
  { value: 'proofreading', label: 'Proofreading', icon: '📝' },
  { value: 'citation-formatting', label: 'Citation Formatting', icon: '📋' },
  { value: 'thesis-writing', label: 'Thesis Writing', icon: '📚' },
  { value: 'document-formatting', label: 'Document Formatting', icon: '📄' },
];

interface PricingRow {
  key: string;
  service: string;
  starting: string;
  perPage: string;
  turnaround: string;
}

const pricingData: PricingRow[] = [
  { key: '1', service: 'Plagiarism Check', starting: '₹299', perPage: '₹5/page', turnaround: '24 hrs' },
  { key: '2', service: 'Plagiarism Removal', starting: '₹499', perPage: '₹15/page', turnaround: '48 hrs' },
  { key: '3', service: 'Proofreading', starting: '₹299', perPage: '₹10/page', turnaround: '24 hrs' },
  { key: '4', service: 'Citation Formatting', starting: '₹199', perPage: '₹5/page', turnaround: '24 hrs' },
  { key: '5', service: 'Thesis Writing', starting: '₹4,999', perPage: '₹120/page', turnaround: '7+ days' },
  { key: '6', service: 'Document Formatting', starting: '₹199', perPage: '₹5/page', turnaround: '24 hrs' },
];

const pricingColumns: ColumnsType<PricingRow> = [
  {
    title: 'Service',
    dataIndex: 'service',
    key: 'service',
    render: (v) => <Text strong>{v}</Text>,
  },
  {
    title: 'Starting Price',
    dataIndex: 'starting',
    key: 'starting',
    render: (v) => <Text style={{ color: '#1e3a5f', fontWeight: 600 }}>{v}</Text>,
  },
  {
    title: 'Per Page',
    dataIndex: 'perPage',
    key: 'perPage',
  },
  {
    title: 'Turnaround',
    dataIndex: 'turnaround',
    key: 'turnaround',
    render: (v) => <Tag color="blue">{v}</Tag>,
  },
];

const Calculator = () => {
  const [service, setService] = useState<ServiceId>('plagiarism-check');
  const [pages, setPages] = useState(10);
  const [plagPercent, setPlagPercent] = useState(20);

  const estimate = useMemo(() => {
    const rule = PRICING[service];
    let price = rule.base + rule.perPage * pages;
    if (service === 'plagiarism-removal' && rule.removalMultiplier) {
      price += price * (plagPercent * rule.removalMultiplier);
    }
    return Math.round(price);
  }, [service, pages, plagPercent]);

  const selectedService = SERVICE_OPTIONS.find((s) => s.value === service);

  return (
    <>
      <div className="bg-[#1e3a5f] text-white py-14">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <Space direction="vertical" align="center">
            <CalculatorOutlined style={{ fontSize: 40, color: '#f59e0b' }} />
            <Title level={1} style={{ color: 'white', margin: 0 }}>Cost Calculator</Title>
            <Text style={{ color: '#93c5fd', fontSize: 16 }}>
              Get an instant estimate for your academic service request.
            </Text>
          </Space>
        </div>
      </div>

      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Row gutter={[24, 24]} align="top">
            {/* Config Panel */}
            <Col xs={24} lg={14}>
              <Card className="rounded-2xl shadow-lg" bodyStyle={{ padding: 36 }}>
                <Title level={4} style={{ color: '#1e3a5f', marginBottom: 28 }}>
                  Configure Your Request
                </Title>

                {/* Service Selector */}
                <div className="mb-6">
                  <Text className="label block mb-2">Service Type</Text>
                  <Select
                    value={service}
                    onChange={setService}
                    size="large"
                    style={{ width: '100%' }}
                    showSearch
                  >
                    {SERVICE_OPTIONS.map((o) => (
                      <Option key={o.value} value={o.value}>
                        {o.icon} {o.label}
                      </Option>
                    ))}
                  </Select>
                </div>

                <Divider />

                {/* Pages Slider */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <Text className="label">Number of Pages</Text>
                    <Tag color="blue" style={{ fontSize: 16, padding: '2px 12px' }}>
                      {pages} pages
                    </Tag>
                  </div>
                  <Slider
                    min={1}
                    max={200}
                    value={pages}
                    onChange={setPages}
                    marks={{ 1: '1', 50: '50', 100: '100', 200: '200' }}
                    tooltip={{ formatter: (v) => `${v} pages` }}
                    trackStyle={{ backgroundColor: '#1e3a5f' }}
                    handleStyle={{ borderColor: '#1e3a5f' }}
                  />
                </div>

                {/* Plagiarism % (conditional) */}
                {service === 'plagiarism-removal' && (
                  <>
                    <Divider />
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <Text className="label">Current Plagiarism %</Text>
                        <Tag color="red" style={{ fontSize: 16, padding: '2px 12px' }}>
                          {plagPercent}%
                        </Tag>
                      </div>
                      <Slider
                        min={10}
                        max={90}
                        value={plagPercent}
                        onChange={setPlagPercent}
                        marks={{ 10: '10%', 30: '30%', 60: '60%', 90: '90%' }}
                        tooltip={{ formatter: (v) => `${v}%` }}
                        trackStyle={{ backgroundColor: '#dc2626' }}
                        handleStyle={{ borderColor: '#dc2626' }}
                      />
                    </div>
                  </>
                )}

                <Card
                  size="small"
                  className="bg-amber-50 border-amber-200 rounded-xl mt-4"
                  bodyStyle={{ padding: 16 }}
                >
                  <Text style={{ color: '#92400e', fontSize: 13 }}>
                    <strong>Note:</strong> This is an estimate only. Final pricing depends on document
                    complexity and other factors. We'll send an exact quote after review.
                  </Text>
                </Card>
              </Card>
            </Col>

            {/* Result Panel */}
            <Col xs={24} lg={10}>
              <Card
                className="rounded-2xl shadow-xl"
                style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #152844 100%)', border: 'none' }}
                bodyStyle={{ padding: 36 }}
              >
                <Text style={{ color: '#93c5fd', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Your Estimate
                </Text>

                <div className="mt-3 mb-6">
                  <Statistic
                    value={estimate}
                    prefix="₹"
                    valueStyle={{ color: '#f59e0b', fontSize: 48, fontWeight: 800 }}
                    suffix={
                      <Text style={{ color: '#93c5fd', fontSize: 14 }}> est.</Text>
                    }
                  />
                  <Text style={{ color: '#93c5fd', fontSize: 12 }}>Starting estimate (excl. GST)</Text>
                </div>

                <Divider style={{ borderColor: 'rgba(255,255,255,0.2)', margin: '16px 0' }} />

                <Space direction="vertical" size="small" style={{ width: '100%', marginBottom: 20 }}>
                  {[
                    ['Service', selectedService?.label],
                    ['Pages', `${pages} pages`],
                    ...(service === 'plagiarism-removal' ? [['Plagiarism %', `${plagPercent}%`]] : []),
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between">
                      <Text style={{ color: '#93c5fd', fontSize: 13 }}>{label}</Text>
                      <Text style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>{val}</Text>
                    </div>
                  ))}
                </Space>

                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <Link to={`/submit?service=${service}`} style={{ width: '100%', display: 'block' }}>
                    <Button
                      type="primary"
                      size="large"
                      block
                      icon={<ThunderboltOutlined />}
                      style={{ background: '#f59e0b', borderColor: '#f59e0b', fontWeight: 600 }}
                    >
                      Order Now
                    </Button>
                  </Link>
                  <Link to="/contact" style={{ width: '100%', display: 'block' }}>
                    <Button
                      size="large"
                      block
                      icon={<ArrowRightOutlined />}
                      style={{
                        background: 'transparent',
                        borderColor: 'rgba(255,255,255,0.3)',
                        color: 'white',
                        fontWeight: 600,
                      }}
                    >
                      Get Exact Quote
                    </Button>
                  </Link>
                </Space>
              </Card>
            </Col>
          </Row>

          {/* Pricing Table */}
          <Card
            title={
              <Space>
                <CalculatorOutlined style={{ color: '#1e3a5f' }} />
                <Text strong style={{ color: '#1e3a5f' }}>Pricing Overview</Text>
              </Space>
            }
            className="mt-10 rounded-2xl shadow-lg overflow-hidden"
            headStyle={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}
          >
            <Table
              columns={pricingColumns}
              dataSource={pricingData}
              pagination={false}
              size="middle"
              scroll={{ x: 500 }}
              onRow={(record) => ({
                style: { cursor: 'pointer' },
                onClick: () => {
                  const mapped: Record<string, ServiceId> = {
                    'Plagiarism Check': 'plagiarism-check',
                    'Plagiarism Removal': 'plagiarism-removal',
                    Proofreading: 'proofreading',
                    'Citation Formatting': 'citation-formatting',
                    'Thesis Writing': 'thesis-writing',
                    'Document Formatting': 'document-formatting',
                  };
                  if (mapped[record.service]) setService(mapped[record.service]);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                },
              })}
            />
          </Card>
        </div>
      </section>
    </>
  );
};

export default Calculator;
