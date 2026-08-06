from dataclasses import dataclass


@dataclass
class MatchResult:
    score: float
    rationale: str


def score_opportunity() -> MatchResult:
    # TODO: plug in embedding/model-based matching logic.
    return MatchResult(score=0.0, rationale="Matching model not configured yet.")

