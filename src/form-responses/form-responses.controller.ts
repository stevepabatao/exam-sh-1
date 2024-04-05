import { Controller, Get, Param, Query } from '@nestjs/common';
import axios from 'axios';

@Controller(':formId/filteredResponses')
export class FormResponsesController {
  @Get()
  async getFilteredResponses(
    @Param('formId') formId: string,
    @Query('filters') filters: string,
  ) {
    try {
      const apiKey = 'sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912';
      const apiUrl = `https://api.fillout.com/v1/api/forms/${formId}/submissions`;

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      const q = response.data.responses.map(item => item.questions);
      const filteredQuestions = this.filterQuestions(q, JSON.parse(filters));
      
      let x = filteredQuestions;

      x = Object.assign({}, x, { totalResponse: x.flat().length });
      x = Object.assign({}, x, { totalPage: 1 });

      console.log(x);

      return x;
    } catch (error) {
      console.log(error);
      throw new Error('Error fetching responses from Fillout.com API');
    }
  }

  filterQuestions(questions, filterNodes) {
    return questions.filter(questionGroup => {
        return filterNodes.every(filterNode => {
          return questionGroup.some(question => {
            switch (filterNode.condition) {
              case 'equals':
                return question.value === filterNode.value;
              case 'does_not_equal':
                return question.value !== filterNode.value;
              case 'greater_than':
                return question.value > filterNode.value;
              case 'less_than':
                return question.value < filterNode.value;
              default:
                return false; // Invalid condition
            }
          });
        });
      });
    }
 }