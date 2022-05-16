using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;

namespace Text_based_game
{
    class Ending
    {
        public string Name;
        public string Narration;
        public string[] EventRequirements;
        public int MinimumConfidence = 0;
        public int MaximumConfidence = Int32.MaxValue;
        public int MinimumAlarmLevel = 0;
    }
    class Event
    {
        public string Name;
        public string Narration;
        public List<Choice> Choices;
    }
    class Choice
    {
        public int MinimumConfidence;
        public int ConfidenceAlteration;
        public int AlarmLevelAlteration;
        public string EventRequirement;
        public string SpecialItemRequirement;
        public string SpecialItemGained;
        public string Narration;
        public string Name;
        public string NextEvent;
    }
    internal class Program
    {
        static List<Event> events = new List<Event>();
        static List<Ending> endings = new List<Ending>();


        //A method which checks if the game is over.
        static Ending CheckGameOver(int alarmLevel, int confidence, List<string> storyline)
        {
            foreach (Ending ending in endings)
            {
                if (confidence < ending.MinimumConfidence)
                {
                    continue;
                }

                if (confidence > ending.MaximumConfidence)
                {
                    continue;
                }

                if (alarmLevel < ending.MinimumAlarmLevel)
                {
                    continue;
                }

                if (ending.EventRequirements != null)
                {
                    bool eventRequirementsAreMet = true;
                    foreach (string eventRequirement in ending.EventRequirements)
                    {
                        if (!storyline.Contains(eventRequirement))
                        {
                            eventRequirementsAreMet = false;
                            break;
                        }
                    }

                    if (!eventRequirementsAreMet)
                    {
                        continue;
                    }

                }

                return ending;
            }
            return null;

        }
        //A method which checks which ending the player got if the game is over.
        static void HandleEnding(Ending ending)
        {
            Console.WriteLine(ending.Narration);
        }

        //TODO:EncounteringTheDragon method


        //Gets the next event.
        static Event GetEvent(string name)
        {
            Event result = events.Find(storyEvent => storyEvent.Name == name);
            if (result != null)
            {
                return result;
            }
            throw new ArgumentException("Event does not exist");
        }
        //Checks conditions for the choices of the current event.
        static bool IsChoicePossible(Choice choice, int confidence, List<string> storyline, List<string> inventory)
        {
            if (confidence < choice.MinimumConfidence)
            {
                return false;
            }

            if (choice.EventRequirement != null && !storyline.Contains(choice.EventRequirement))
            {
                return false;
            }

            if (choice.SpecialItemRequirement != null && !inventory.Contains(choice.SpecialItemRequirement))
            {
                return false;
            }

            return true;
        }
        static void Main(string[] args)
        {
            //Initialization
            //Reading files and then splitting them.
            string eventsPath = "Events.txt";
            string eventsText = File.ReadAllText(eventsPath);
            string[] eventGroups = eventsText.Split("\r\n\r\n");

            string choicesPath = "Choices.txt";
            string choicesText = File.ReadAllText(choicesPath);
            string[] choiceGroups = choicesText.Split("\r\n\r\n\r\n");

            string endPath = "Endings.txt";
            string endText = File.ReadAllText(endPath);
            string[] endGroups = endText.Split("\r\n\r\n");

            //Initializ choices and events.
            for (int eventIndex = 0; eventIndex < eventGroups.Length; eventIndex++)
            {
                //List of choices in individual events.
                var eventChoices = new List<Choice>();
                string[] choicesPerEvent = choiceGroups[eventIndex].Split("\r\n\r\n");

                //Using regex to find individual items in the choice file.
                foreach (string choiceInfoText in choicesPerEvent)
                {
                    Match choiceInfo = Regex.Match(choiceInfoText, "Name: (.*)\\r\\nNarration: (.*)");

                    //Choice class definition.
                    var choice = new Choice();
                    choice.Name = choiceInfo.Groups[1].Value;
                    choice.Narration = choiceInfo.Groups[2].Value;

                    Match confidenceInfo = Regex.Match(choiceInfoText, "Confidence alteration: ([^\\r]*)");
                    if (confidenceInfo.Success)
                    {
                        int intConfidenceAlteration = Int32.Parse(confidenceInfo.Groups[1].Value);
                        choice.ConfidenceAlteration = intConfidenceAlteration;
                    }

                    Match alarmInfo = Regex.Match(choiceInfoText, "Alarm level alteration: ([^\\r]*)");
                    if (alarmInfo.Success)
                    {
                        int intAlarmLevelAlteration = Int32.Parse(alarmInfo.Groups[1].Value);
                        choice.AlarmLevelAlteration = intAlarmLevelAlteration;
                    }

                    Match minimumConfidenceInfo = Regex.Match(choiceInfoText, "Minimum confidence: ([^\\r]*)");
                    if (minimumConfidenceInfo.Success)
                    {
                        int intMinimumConfidence = Int32.Parse(minimumConfidenceInfo.Groups[1].Value);
                        choice.MinimumConfidence = intMinimumConfidence;
                    }

                    Match specialItemRequirementInfo = Regex.Match(choiceInfoText, "Special item requirement: ([^\\r]*)");
                    if (specialItemRequirementInfo.Success)
                    {
                        choice.SpecialItemRequirement = specialItemRequirementInfo.Groups[1].Value;
                    }

                    Match specialItemGainedInfo = Regex.Match(choiceInfoText, "Special item gained: ([^\\r]*)");
                    if (specialItemGainedInfo.Success)
                    {
                        choice.SpecialItemGained = specialItemGainedInfo.Groups[1].Value;
                    }

                    Match eventRequirementInfo = Regex.Match(choiceInfoText, "Event requriement: ([^\\r]*)");
                    if (eventRequirementInfo.Success)
                    {
                        choice.EventRequirement = eventRequirementInfo.Groups[1].Value;
                    }

                    Match nextEventInfo = Regex.Match(choiceInfoText, "Next event: ([^\\r]*)");
                    if (nextEventInfo.Success)
                    {
                        choice.NextEvent = nextEventInfo.Groups[1].Value;
                    }

                    //Adding choices into a list that goes to event class.
                    eventChoices.Add(choice);
                }

                //Using regex to find individual items in the events file.
                Match eventInfo = Regex.Match(eventGroups[eventIndex], "Name: (.*)\\r\\nNarration: (.*)");

                //Event class definition.
                var newEvent = new Event();
                newEvent.Name = eventInfo.Groups[1].Value;
                newEvent.Narration = eventInfo.Groups[2].Value;
                newEvent.Choices = eventChoices;
                events.Add(newEvent);
            }

            //Initializ endings.
            foreach (string endGroup in endGroups)
            {
                Ending ending = new Ending();

                Match endNameInfo = Regex.Match(endGroup, "Name: ([^\\r]+)");
                if (endNameInfo.Success)
                {
                    ending.Name = endNameInfo.Groups[1].Value;
                }

                Match endNarrationInfo = Regex.Match(endGroup, "Narration: ([^\\r]+)");
                if (endNarrationInfo.Success)
                {
                    ending.Narration = endNarrationInfo.Groups[1].Value;
                }

                Match endEventRequirementInfo = Regex.Match(endGroup, "Event requirement: ([^\\r]+)");
                if (endEventRequirementInfo.Success)
                {
                    string[] eventRequitements = endEventRequirementInfo.Groups[1].Value.Split(", ");
                    ending.EventRequirements = eventRequitements;
                }

                Match endMinConfidenceInfo = Regex.Match(endGroup, "Minimum confidence: ([^\\r]+)");
                if (endMinConfidenceInfo.Success)
                {
                    int intEndMinConfidenceInfo = Int32.Parse(endMinConfidenceInfo.Groups[1].Value);
                    ending.MinimumConfidence = intEndMinConfidenceInfo;
                }

                Match endMaxConfidenceInfo = Regex.Match(endGroup, "Maximum confidence: ([^\\r]+)");
                if (endMaxConfidenceInfo.Success)
                {
                    int intEndMaxConfidenceInfo = Int32.Parse(endMaxConfidenceInfo.Groups[1].Value);
                    ending.MaximumConfidence = intEndMaxConfidenceInfo;
                }

                Match endMinAlarmLevelInfo = Regex.Match(endGroup, "Minimum alarm level: ([^\\r]+)");
                if (endMinAlarmLevelInfo.Success)
                {
                    int intEndMinAlarmLevelInfo = Int32.Parse(endMinAlarmLevelInfo.Groups[1].Value);
                    ending.MinimumAlarmLevel = intEndMinAlarmLevelInfo;
                }


                endings.Add(ending);
            }


            //Gameplay
            int confidence = 1;
            int alarmLevel = 0;
            string userInput;
            int intUserInput;

            //List of events the player has cleared.
            var storyline = new List<string>();
            //List of special item player has gained.
            var inventory = new List<string>();


            //Game intro.
            Console.WriteLine("A lone thief has set up camp in a forest. Less than a day away has a dragon made its lair.\nThe thief has gathered what confidence they could find and has made it this far...\nWill their confidence grow or fallter? Will the dragon spot them or will they go unseen...\nOnly time will tell...");
            Console.WriteLine("\nPress any button to commence with the theft.");
            Console.ReadLine();

            Event currentEvent = events[0];

            do
            {
                //Alarm check
                if (alarmLevel == 5)
                {
                    //TODO:Move to encounteringTheDragon method
                }

                //TODO:Check ending
                Ending ending = CheckGameOver(alarmLevel, confidence, storyline);
                if (ending != null)
                {
                    HandleEnding(ending);
                    break;
                }

                //Clearing previous text and output UI.
                Console.Clear();
                Console.WriteLine($"Confidence:{confidence} Alarm Level:{alarmLevel}\n");
                Console.WriteLine(currentEvent.Narration);
                var possibleChoices = new List<Choice>();
                foreach (Choice choice in currentEvent.Choices)
                {
                    if (IsChoicePossible(choice, confidence, storyline, inventory))
                    {
                        possibleChoices.Add(choice);
                    }
                }
                int counter = 1;
                foreach (Choice choice in possibleChoices)
                {
                    Console.WriteLine($"{counter}. {choice.Name}");
                    counter++;
                }

                //Selects a choice based on the players input.
                Choice selectedChoice;

                do
                {
                    userInput = Console.ReadLine();

                    if (Regex.IsMatch(userInput, "\\d"))
                    {
                        try
                        {
                            intUserInput = int.Parse(userInput);
                            selectedChoice = possibleChoices[intUserInput - 1];

                            break;
                        }
                        catch (ArgumentOutOfRangeException)
                        {
                            Console.WriteLine("Try one of listed numbers.");
                        }
                    }
                    else
                    {
                        Console.WriteLine($"{userInput} is not an option. Try again!");
                    }

                } while (true);

                //Display choice
                Console.WriteLine(selectedChoice.Narration);
                Console.ReadLine();


                confidence += selectedChoice.ConfidenceAlteration;
                alarmLevel += selectedChoice.AlarmLevelAlteration;

                if (alarmLevel < 0)
                {
                    alarmLevel = 0;
                }

                //Adds found item to inventory.
                if (selectedChoice.SpecialItemGained != null)
                {
                    inventory.Add(selectedChoice.SpecialItemGained);
                }

                storyline.Add(currentEvent.Name);

                //Move to next event
                if (currentEvent.Name == "Knights camp")
                {
                    if (inventory.Contains("Main entrance"))
                    {

                        currentEvent = GetEvent("The main entrance");
                    }
                    else if (inventory.Contains("Underground tunnels"))
                    {
                        currentEvent = GetEvent("The underground tunnel");
                    }
                    else
                    {
                        currentEvent = GetEvent("The secret door");
                    }
                }
                else
                {
                    currentEvent = GetEvent(selectedChoice.NextEvent);
                }


            } while (true);

        }
    }
}
