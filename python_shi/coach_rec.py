import os
from openai import OpenAI
from dotenv import load_dotenv
from getAngles import getAngles

# Load environment variables from the .env file
load_dotenv(".env")

# Set OpenAI API key from environment variable
OpenAI.api_key = os.getenv('OPENAI_API_KEY')
print(OpenAI.api_key)

def generate_advice(knee_angle: str, 
                    ankle_angle: str, 
                    plant_knee_angle: str, 
                    plant_ankle_angle: str,
                    body_straight_angle) -> str:
    """
    Generates coaching tips for given angles of a player's limbs.

    Args:
        angles (str): The angle between the player's knee, ankle, and toe.

    Returns:
        str: Generated coaching advice based on the provided angle.
    """

    client = OpenAI()

    # Make a request to the OpenAI ChatCompletion API
    completion = client.chat.completions.create(
        model="gpt-4o",  # Corrected model name; ensure you have access to this model
        messages=[
            {
                "role": "system",
                "content": "You are a helpful soccer coach who provides instructions to improve a person's shot."
            },
            {
                "role": "user",
                "content": (
                    f"The angle between my hip, knee, and ankle is {knee_angle}. "
                    f"The angle between my knee, ankle, and toe is {ankle_angle}. "
                    f"The angle between my plant hip, plant knee, and ankle is {plant_knee_angle}. "
                    f"The angle between my plant knee, plant ankle, and toe is {plant_ankle_angle}. "
                    f"The angle related to my body's straightness is {body_straight_angle}. "
                    "Provide some coaching tips based on these angles. "
                    "Always format your response as follows:"
                    '[{"id":"1","title":"Improve Follow Through","description":"Extend your kicking leg fully after contact with the ball for better power and accuracy."},{"id":"2","title":"Plant Foot Position","description":"Position your plant foot closer to the ball for better stability and control."},{"id":"3","title":"Hip Rotation","description":"Increase hip rotation during the shot to generate more power in your kicks."}]'
                    
                )
            }
        ]
    )
    
    # Extract the generated advice from the response
    advice = completion.choices[0].message.content
    return advice

