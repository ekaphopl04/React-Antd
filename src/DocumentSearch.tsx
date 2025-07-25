import React, { useState, useEffect, useCallback } from 'react';
import {
  Input,
  Card,
  List,
  Tag,
  Space,
  Typography,
  Row,
  Col,
  Button,
  Empty,
  Spin,
  Select
} from 'antd';
import {
  SearchOutlined,
  FileTextOutlined,
  CalendarOutlined,
  TagOutlined,
  DownloadOutlined,
  EyeOutlined
} from '@ant-design/icons';

const { Search } = Input;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// Type definitions
interface Document {
  id: number;
  title: string;
  content: string;
  type: 'PDF' | 'DOCX' | 'XLSX' | 'PPTX';
  size: string;
  date: string;
  tags: string[];
  author: string;
  category: string;
}

type DocumentType = 'PDF' | 'DOCX' | 'XLSX' | 'PPTX';
type FilterValue = string | 'all';

// Mock document data
const mockDocuments: Document[] = [
  {
    id: 1,
    title: 'การวิเคราะห์ตลาดการเงิน Q4 2024',
    content: 'รายงานการวิเคราะห์ตลาดการเงินไทยในไตรมาสที่ 4 ของปี 2024 พร้อมแนวโน้มการลงทุน',
    type: 'PDF',
    size: '2.5 MB',
    date: '2024-12-15',
    tags: ['การเงิน', 'ตลาด', 'วิเคราะห์'],
    author: 'ทีมวิจัย',
    category: 'รายงานการเงิน'
  },
  {
    id: 2,
    title: 'คู่มือการใช้งานระบบ CRM',
    content: 'เอกสารคู่มือการใช้งานระบบบริหารลูกค้าสำหรับพนักงานใหม่',
    type: 'DOCX',
    size: '1.8 MB',
    date: '2024-11-20',
    tags: ['คู่มือ', 'CRM', 'ระบบ'],
    author: 'ฝ่าย IT',
    category: 'คู่มือการใช้งาน'
  },
  {
    id: 3,
    title: 'นโยบายความปลอดภัยข้อมูล',
    content: 'นโยบายและแนวปฏิบัติด้านความปลอดภัยข้อมูลของบริษัท',
    type: 'PDF',
    size: '950 KB',
    date: '2024-10-05',
    tags: ['นโยบาย', 'ความปลอดภัย', 'ข้อมูล'],
    author: 'ฝ่ายกฎหมาย',
    category: 'นโยบาย'
  },
  {
    id: 4,
    title: 'แผนกลยุทธ์ดิจิทัล 2025',
    content: 'แผนการดำเนินงานด้านดิจิทัลทรานส์ฟอร์เมชันสำหรับปี 2025',
    type: 'PPTX',
    size: '4.2 MB',
    date: '2024-12-01',
    tags: ['กลยุทธ์', 'ดิจิทัล', 'แผน'],
    author: 'ฝ่ายกลยุทธ์',
    category: 'แผนงาน'
  },
  {
    id: 5,
    title: 'รายงานผลการดำเนินงาน Q3 2024',
    content: 'สรุปผลการดำเนินงานและผลประกอบการในไตรมาสที่ 3',
    type: 'XLSX',
    size: '3.1 MB',
    date: '2024-09-30',
    tags: ['รายงาน', 'ผลงาน', 'Q3'],
    author: 'ฝ่ายบัญชี',
    category: 'รายงานการเงิน'
  }
];

const DocumentSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>(mockDocuments);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<FilterValue>('all');
  const [selectedType, setSelectedType] = useState<FilterValue>('all');

  // Get unique categories and types for filters
  const categories: string[] = Array.from(new Set(mockDocuments.map(doc => doc.category)));
  const documentTypes: DocumentType[] = Array.from(new Set(mockDocuments.map(doc => doc.type)));

  const filterDocuments = useCallback((): void => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let filtered: Document[] = mockDocuments;

      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(doc =>
          doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }

      // Filter by category
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(doc => doc.category === selectedCategory);
      }

      // Filter by document type
      if (selectedType !== 'all') {
        filtered = filtered.filter(doc => doc.type === selectedType);
      }

      setFilteredDocuments(filtered);
      setLoading(false);
    }, 300);
  }, [searchTerm, selectedCategory, selectedType]);

  useEffect(() => {
    filterDocuments();
  }, [filterDocuments]);

  const handleSearch = (value: string): void => {
    setSearchTerm(value);
  };

  const handleCategoryChange = (value: FilterValue): void => {
    setSelectedCategory(value);
  };

  const handleTypeChange = (value: FilterValue): void => {
    setSelectedType(value);
  };

  const getFileIcon = (type: DocumentType): React.ReactNode => {
    return <FileTextOutlined style={{ fontSize: '24px', color: '#1890ff' }} />;
  };

  const getTypeColor = (type: DocumentType): string => {
    const colors: Record<DocumentType, string> = {
      'PDF': 'red',
      'DOCX': 'blue',
      'XLSX': 'green',
      'PPTX': 'orange'
    };
    return colors[type] || 'default';
  };

  const handleViewDocument = (document: Document): void => {
    console.log('View document:', document.title);
    // Implement view functionality
  };

  const handleDownloadDocument = (document: Document): void => {
    console.log('Download document:', document.title);
    // Implement download functionality
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
        <SearchOutlined /> ระบบค้นหาเอกสาร
      </Title>

      {/* Search and Filter Section */}
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Search
              placeholder="ค้นหาเอกสาร..."
              allowClear
              enterButton="ค้นหา"
              size="large"
              onSearch={handleSearch}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col xs={12} md={6}>
            <Select
              placeholder="หมวดหมู่"
              style={{ width: '100%' }}
              size="large"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <Option value="all">ทุกหมวดหมู่</Option>
              {categories.map(category => (
                <Option key={category} value={category}>{category}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={12} md={6}>
            <Select
              placeholder="ประเภทไฟล์"
              style={{ width: '100%' }}
              size="large"
              value={selectedType}
              onChange={handleTypeChange}
            >
              <Option value="all">ทุกประเภท</Option>
              {documentTypes.map(type => (
                <Option key={type} value={type}>{type}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Card>

      {/* Results Summary */}
      <div style={{ marginBottom: '16px' }}>
        <Text type="secondary">
          พบเอกสาร {filteredDocuments.length} รายการ
          {searchTerm && ` สำหรับ "${searchTerm}"`}
        </Text>
      </div>

      {/* Document List */}
      <Spin spinning={loading}>
        {filteredDocuments.length === 0 ? (
          <Empty
            description="ไม่พบเอกสารที่ตรงกับการค้นหา"
            style={{ padding: '48px' }}
          />
        ) : (
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 3,
              xxl: 3,
            }}
            dataSource={filteredDocuments}
            renderItem={(document: Document) => (
              <List.Item>
                <Card
                  hoverable
                  actions={[
                    <Button 
                      key="view"
                      type="text" 
                      icon={<EyeOutlined />}
                      onClick={() => handleViewDocument(document)}
                    >
                      ดูเอกสาร
                    </Button>,
                    <Button 
                      key="download"
                      type="text" 
                      icon={<DownloadOutlined />}
                      onClick={() => handleDownloadDocument(document)}
                    >
                      ดาวน์โหลด
                    </Button>
                  ]}
                >
                  <Card.Meta
                    avatar={getFileIcon(document.type)}
                    title={
                      <div>
                        <Text strong style={{ fontSize: '16px' }}>
                          {document.title}
                        </Text>
                        <div style={{ marginTop: '4px' }}>
                          <Tag color={getTypeColor(document.type)}>
                            {document.type}
                          </Tag>
                        </div>
                      </div>
                    }
                    description={
                      <div>
                        <Paragraph
                          ellipsis={{ rows: 2, expandable: false }}
                          style={{ marginBottom: '12px', color: '#666' }}
                        >
                          {document.content}
                        </Paragraph>
                        
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                          <div>
                            <CalendarOutlined style={{ marginRight: '4px' }} />
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              {document.date}
                            </Text>
                            <Text type="secondary" style={{ marginLeft: '12px', fontSize: '12px' }}>
                              {document.size}
                            </Text>
                          </div>
                          
                          <div>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              โดย: {document.author}
                            </Text>
                          </div>
                          
                          <div>
                            <TagOutlined style={{ marginRight: '4px' }} />
                            {document.tags.map(tag => (
                              <Tag key={tag} style={{ margin: '2px', fontSize: '12px' }}>
                                {tag}
                              </Tag>
                            ))}
                          </div>
                        </Space>
                      </div>
                    }
                  />
                </Card>
              </List.Item>
            )}
          />
        )}
      </Spin>
    </div>
  );
};

export default DocumentSearch;
