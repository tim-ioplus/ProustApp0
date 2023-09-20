using Microsoft.AspNetCore.Mvc;
using ProustApp.Services;
using ProustApp.Domain;
using System.Linq;

namespace ProustApp.Controllers;

[ApiController]
[Route("[controller]")]

public class QuestController : ControllerBase
{
    private readonly ILogger<QuestController> _logger;
    
    public QuestController(ILogger<QuestController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<Quest> Get()
    {        
        var quests = new List<Quest>();
        var questions = new QuestService().GetQuestions(1);
        
        int questionCount = 0;

        quests.AddRange(from question in questions
                        let quest = new Quest
                        {
                            Id = 1,
                            QuestionId = question.Key,
                            QuestionAuthor = "Marcel Proust",
                            QuestionText = question.Value,

                            AnswerId = questionCount,
                            AnswerAuthor = "You",
                            AnswerText = ""
                        }
                        select quest);
        var response = quests.ToArray();
        return response;
    }

    
    [HttpPost]
    public IActionResult Post([FromBody] QuestData questData)
    {
        if(questData?.Quests?.Count > 0)
        {
            var questDataId = new QuestService().Create(questData.Quests);
            return Ok("{questDataId:"+ questDataId +"}");
        }
        else
        {
            return NoContent();
        }        
    }
}

public class QuestData
{
    public List<Quest>? Quests {get; set;}
}