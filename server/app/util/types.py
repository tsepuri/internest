import dataclasses

@dataclasses.dataclass
class InternalUser:
    name: str
    email: str
    clerk_user_id: str