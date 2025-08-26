#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🧪 Running AgroData Test Suite${NC}"
echo "=================================="

# Run all tests with coverage
echo -e "\n${YELLOW}Running unit and integration tests...${NC}"
npm run test:coverage

# Check if tests passed
if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✅ All tests passed!${NC}"
else
    echo -e "\n${RED}❌ Some tests failed. Please check the output above.${NC}"
    exit 1
fi

# Run linting
echo -e "\n${YELLOW}Running ESLint...${NC}"
npm run lint

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ No linting errors found!${NC}"
else
    echo -e "${YELLOW}⚠️  Linting issues found. Please fix them.${NC}"
fi

echo -e "\n${GREEN}🎉 Test suite completed!${NC}"
echo "=================================="
echo "📊 Coverage report generated in coverage/ directory"
echo "🔍 Open coverage/lcov-report/index.html to view detailed coverage"
